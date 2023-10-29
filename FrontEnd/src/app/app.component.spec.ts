import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from './models/Cliente';
import { Prestamo } from './models/Prestamo';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Configuración de las pruebas del componente
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Módulo para simular las rutas
        ReactiveFormsModule, // Módulo para manejar formularios reactivos
        FormsModule, // Módulo para manejar formularios de plantillas
        HttpClientModule // Módulo para realizar peticiones HTTP
      ],
      declarations: [
        AppComponent // Declaración del componente a probar
      ],
      providers: [
        ApiService, // Proveedor del servicio API
      ],
    }).compileComponents(); // Compilación del componente para las pruebas
  });

  // Pruebas relacionadas con la creación del componente
  describe('Creación de la aplicación', () => {
    it('should create the app', () => {
      // Verifica si el componente se ha creado exitosamente
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'examenParcial2'`, () => {
      // Verifica si el componente tiene el título esperado
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('examenParcial2');
    });
  });

  // Pruebas relacionadas con las operaciones de Cliente
  describe('Operaciones de Cliente', () => {

    it('should post a new Cliente', (done: DoneFn) => {
      const cliente: Cliente = {
        // Datos del cliente a enviar
        id_cliente: 1,
        nombre: 'John Doe',
        rfc: 'CAGE010717Q70',
        edad: 12,
        fecha_alta: '2001-10-12',
        telefono: '1234567890',
        correo: 'johndoe@example.com'
      };

      // Simula el servicio API y su respuesta
      const apiService = TestBed.inject(ApiService);
      const postSpy = spyOn(apiService, 'postCliente').and.returnValue(of({
        id_cliente: 123,
        ...cliente
      }));

      apiService.postCliente(cliente).subscribe((response) => {
        // Verifica si la respuesta es válida
        expect(response).toBeTruthy();
        expect(typeof response.id_cliente).toBe('number');

        // Verifica la llamada al método y sus parámetros
        expect(postSpy).toHaveBeenCalled();
        expect(postSpy).toHaveBeenCalledWith(cliente);

        done();
      });
    });

    it('should get all Clientes', (done: DoneFn) => {
      // Simula la obtención de todos los clientes
      const apiService: ApiService = TestBed.inject(ApiService);

      const getAllClientesSpy = spyOn(apiService, 'getAllClientes').and.callThrough();

      apiService.getAllClientes().subscribe(clientes => {
        // Verifica si se obtiene una respuesta válida y es un array de clientes
        expect(clientes).toBeTruthy();
        expect(Array.isArray(clientes)).toBe(true);

        // Verifica si se realizó la llamada al método correspondiente
        expect(getAllClientesSpy).toHaveBeenCalled();

        done();
      });
    });

    it('should get all Prestamos of a Cliente by id_cliente', (done: DoneFn) => {
      // Simula la obtención de todos los préstamos de un cliente por su ID
      const apiService: ApiService = TestBed.inject(ApiService);
      const id_cliente = 1;

      const getPrestamosClienteSpy = spyOn(apiService, 'getPrestamosCliente').and.callThrough();

      apiService.getPrestamosCliente(id_cliente).subscribe(prestamos => {
        // Verifica si se obtiene una respuesta válida y es un array de préstamos
        expect(prestamos).toBeTruthy();
        expect(Array.isArray(prestamos)).toBe(true);

        // Verifica si se realizó la llamada al método correspondiente con el ID del cliente
        expect(getPrestamosClienteSpy).toHaveBeenCalled();
        expect(getPrestamosClienteSpy).toHaveBeenCalledWith(id_cliente);

        done();
      });
    });

    it('should get a Cliente by id_cliente', (done: DoneFn) => {
      // Simula la obtención de un cliente por su ID
      const apiService: ApiService = TestBed.inject(ApiService);
      const id_cliente = 1;

      const getClienteByIdSpy = spyOn(apiService, 'getClienteById').and.callThrough();

      apiService.getClienteById(id_cliente).subscribe(cliente => {
        // Verifica si se obtiene una respuesta válida y si coincide con el ID del cliente
        expect(cliente).toBeTruthy();
        expect(cliente.id_cliente).toBe(id_cliente);

        // Verifica si se realizó la llamada al método correspondiente con el ID del cliente
        expect(getClienteByIdSpy).toHaveBeenCalled();
        expect(getClienteByIdSpy).toHaveBeenCalledWith(id_cliente);

        done();
      });
    });
  });

  // Pruebas relacionadas con las operaciones de Préstamo
  describe('Operaciones de Prestamo', () => {

    it('should post a new Prestamo', (done: DoneFn) => {
      // Simula el envío de un nuevo préstamo y verifica la respuesta
      const prestamo: Prestamo = {
        // Datos del préstamo a enviar
        id_cliente: 1,
        monto: 5000,
        plazo_meses: 12,
        interes: 0.05
      };

      // Simula el servicio API y su respuesta
      const apiService = TestBed.inject(ApiService);
      const postSpy = spyOn(apiService, 'postPrestamo').and.returnValue(of({
        id_prestamo: 123,
        ...prestamo
      }));

      apiService.postPrestamo(prestamo).subscribe((response) => {
        // Verifica si la respuesta es válida
        expect(response).toBeTruthy();
        expect(typeof response.id_prestamo).toBe('number');

        // Verifica la llamada al método y sus parámetros
        expect(postSpy).toHaveBeenCalled();
        expect(postSpy).toHaveBeenCalledWith(prestamo);

        done();
      });
    });
  });
});
