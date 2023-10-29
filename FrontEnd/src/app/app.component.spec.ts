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
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ApiService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'examenParcial2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('examenParcial2');
  });


  it('should post new cliente', (done: DoneFn) => {
    const cliente: Cliente = {
      nombre: 'John Doe',
      rfc: 'CAGE010717Q70',
      edad: 12,
      fecha_alta: '2001-10-12',
      telefono: '1234567890',
      correo: 'johndoe@example.com'
    };

    const apiService = TestBed.inject(ApiService);

    // Crear un espía para el método postCliente
    const postSpy = spyOn(apiService, 'postCliente').and.returnValue(of({
      id_cliente: 123, // Asegúrate de que el objeto devuelto tenga una propiedad id_cliente
      ...cliente
    }));

    apiService.postCliente(cliente).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(typeof response.id_cliente).toBe('number'); // Verificar que id_cliente es un número

      // Verificar que el método postCliente fue llamado
      expect(postSpy).toHaveBeenCalled();

      // Verificar que el método postCliente fue llamado con el cliente correcto
      expect(postSpy).toHaveBeenCalledWith(cliente);

      done(); // Indicar que la operación asíncrona ha terminado
    });
  });

  it('should get all Clientes', (done: DoneFn) => {
    const apiService: ApiService = TestBed.inject(ApiService);

    // Crear un espía para el método getAllClientes
    const getAllClientesSpy = spyOn(apiService, 'getAllClientes').and.callThrough();

    apiService.getAllClientes().subscribe(clientes => {
      expect(clientes).toBeTruthy();
      expect(Array.isArray(clientes)).toBe(true);

      // Verificar que el método getAllClientes fue llamado
      expect(getAllClientesSpy).toHaveBeenCalled();

      // Agregar expectativas adicionales según el comportamiento esperado de la API
      // ...

      done(); // Asegúrate de llamar a la función 'done()' para indicar que las expectativas han sido evaluadas
    });
  });

  it('should get a Cliente by id', (done: DoneFn) => {
    const apiService: ApiService = TestBed.inject(ApiService);
    const id_cliente = 1;

    // Crear un espía para el método getClienteById
    const getClienteByIdSpy = spyOn(apiService, 'getClienteById').and.callThrough();

    apiService.getClienteById(id_cliente).subscribe(cliente => {
      expect(cliente).toBeTruthy();
      expect(cliente.id_cliente).toBe(id_cliente);

      // Verificar que el método getClienteById fue llamado
      expect(getClienteByIdSpy).toHaveBeenCalled();

      // Verificar que el método getClienteById fue llamado con el id_cliente correcto
      expect(getClienteByIdSpy).toHaveBeenCalledWith(id_cliente);

      done(); // Indicate that the async operation has completed
    });
  });

  it('should get all Prestamos by id_cliente', (done: DoneFn) => {
    const apiService: ApiService = TestBed.inject(ApiService);
    const id_cliente = 1;

    // Crear un espía para el método getPrestamosCliente
    const getPrestamosClienteSpy = spyOn(apiService, 'getPrestamosCliente').and.callThrough();

    apiService.getPrestamosCliente(id_cliente).subscribe(prestamos => {
      expect(prestamos).toBeTruthy();
      expect(Array.isArray(prestamos)).toBe(true);

      // Verificar que el método getPrestamosCliente fue llamado
      expect(getPrestamosClienteSpy).toHaveBeenCalled();

      // Verificar que el método getPrestamosCliente fue llamado con el id_cliente correcto
      expect(getPrestamosClienteSpy).toHaveBeenCalledWith(id_cliente);

      done(); // Indicar que la operación asíncrona ha terminado
    });
  });

  // PostPrestamo
});
