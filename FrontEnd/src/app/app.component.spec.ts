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

  describe('Creación de la aplicación', () => {
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
  });
  describe('Operaciones de Cliente', () => {

    it('should post a new Cliente', (done: DoneFn) => {
      const cliente: Cliente = {
        nombre: 'John Doe',
        rfc: 'CAGE010717Q70',
        edad: 12,
        fecha_alta: '2001-10-12',
        telefono: '1234567890',
        correo: 'johndoe@example.com'
      };

      const apiService = TestBed.inject(ApiService);

      const postSpy = spyOn(apiService, 'postCliente').and.returnValue(of({
        id_cliente: 123,
        ...cliente
      }));

      apiService.postCliente(cliente).subscribe((response) => {
        expect(response).toBeTruthy();
        expect(typeof response.id_cliente).toBe('number');

        expect(postSpy).toHaveBeenCalled();

        expect(postSpy).toHaveBeenCalledWith(cliente);

        done();
      });
    });

    it('should get all Clientes', (done: DoneFn) => {
      const apiService: ApiService = TestBed.inject(ApiService);

      const getAllClientesSpy = spyOn(apiService, 'getAllClientes').and.callThrough();

      apiService.getAllClientes().subscribe(clientes => {
        expect(clientes).toBeTruthy();
        expect(Array.isArray(clientes)).toBe(true);

        expect(getAllClientesSpy).toHaveBeenCalled();

        done();
      });
    });

    it('should get all Prestamos of a Cliente by id_cliente', (done: DoneFn) => {
      const apiService: ApiService = TestBed.inject(ApiService);
      const id_cliente = 1;

      const getPrestamosClienteSpy = spyOn(apiService, 'getPrestamosCliente').and.callThrough();

      apiService.getPrestamosCliente(id_cliente).subscribe(prestamos => {
        expect(prestamos).toBeTruthy();
        expect(Array.isArray(prestamos)).toBe(true);

        expect(getPrestamosClienteSpy).toHaveBeenCalled();

        expect(getPrestamosClienteSpy).toHaveBeenCalledWith(id_cliente);

        done();
      });
    });

    it('should get a Cliente by id_cliente', (done: DoneFn) => {
      const apiService: ApiService = TestBed.inject(ApiService);
      const id_cliente = 1;

      const getClienteByIdSpy = spyOn(apiService, 'getClienteById').and.callThrough();

      apiService.getClienteById(id_cliente).subscribe(cliente => {
        expect(cliente).toBeTruthy();
        expect(cliente.id_cliente).toBe(id_cliente);

        expect(getClienteByIdSpy).toHaveBeenCalled();

        expect(getClienteByIdSpy).toHaveBeenCalledWith(id_cliente);

        done();
      });
    });
  });

  describe('Operaciones de Prestamo', () => {

    it('should post a new Prestamo', (done: DoneFn) => {
      const prestamo: Prestamo = {
        id_cliente: 1,
        monto: 5000,
        plazo_meses: 12,
        interes: 0.05
      };

      const apiService = TestBed.inject(ApiService);

      const postSpy = spyOn(apiService, 'postPrestamo').and.returnValue(of({
        id_prestamo: 123,
        ...prestamo
      }));

      apiService.postPrestamo(prestamo).subscribe((response) => {
        expect(response).toBeTruthy();
        expect(typeof response.id_prestamo).toBe('number');

        expect(postSpy).toHaveBeenCalled();

        expect(postSpy).toHaveBeenCalledWith(prestamo);

        done();
      });
    });
  });
});
