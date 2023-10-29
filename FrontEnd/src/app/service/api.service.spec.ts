import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import {
  _URL_GET_CLIENTES,
  _URL_GET_CLIENTE_BY_ID,
  _URL_GET_PRESTAMOS_CLIENTE,
  _URL_POST_CLIENTE,
  _URL_POST_PRESTAMO
} from '../config/config';
import { Cliente } from '../models/Cliente';
import { Prestamo } from '../models/Prestamo';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // Configuración de las pruebas
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Módulo para simular peticiones HTTP
      providers: [ApiService] // Proveedor del servicio API
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verificación de que no haya peticiones pendientes
  });

  // Prueba relacionada con la creación del servicio API
  describe('Creación de elementos', () => {
    it('should be created', () => {
      // Verifica si el servicio se ha creado exitosamente
      expect(service).toBeTruthy();
    });
  });

  // Pruebas relacionadas con las operaciones de Cliente
  describe('Operaciones de Cliente', () => {

    it('should get all Clientes', () => {
      // Simula la obtención de todos los clientes
      service.getAllClientes().subscribe();

      const req = httpMock.expectOne(_URL_GET_CLIENTES);
      expect(req.request.method).toBe('GET');
    });

    it('should get a Cliente by id_cliente', () => {
      // Simula la obtención de un cliente por su ID
      const id_cliente = 1;
      service.getClienteById(id_cliente).subscribe();

      const req = httpMock.expectOne(`${_URL_GET_CLIENTE_BY_ID}/${id_cliente}`);
      expect(req.request.method).toBe('GET');
    });

    it('should post a new Cliente', () => {
      // Simula el envío de un nuevo cliente y verifica la respuesta
      const dummyCliente: Cliente = {
        // Datos del cliente a enviar
        nombre: 'Juan',
        rfc: 'GOMJ880406',
        edad: 35,
        fecha_alta: '2023-10-29',
        telefono: '4491234567',
        correo: 'juan@gmail.com'
      };

      service.postCliente(dummyCliente).subscribe(cliente => {
        // Verifica si se recibe el cliente esperado como respuesta
        expect(cliente).toEqual(dummyCliente);
      });

      const req = httpMock.expectOne(_URL_POST_CLIENTE);
      expect(req.request.method).toBe('POST');
      req.flush(dummyCliente);
    });

    it('should get all Prestamos of a Cliente by id_cliente', () => {
      // Simula la obtención de todos los préstamos de un cliente por su ID
      const id_cliente = 1;
      const dummyPrestamos: Prestamo[] = [
        // Datos de préstamos simulados
        { id_prestamo: 1, id_cliente: id_cliente, monto: 5000, plazo_meses: 12, interes: 0.05 },
        { id_prestamo: 2, id_cliente: id_cliente, monto: 3000, plazo_meses: 6, interes: 0.03 },
      ];

      service.getPrestamosCliente(id_cliente).subscribe(prestamos => {
        // Verifica si se obtiene una lista válida de préstamos
        expect(prestamos.length).toBe(2);
        expect(prestamos).toEqual(dummyPrestamos);
      });

      const req = httpMock.expectOne(`${_URL_GET_PRESTAMOS_CLIENTE}/${id_cliente}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPrestamos);
    });
  });

  // Pruebas relacionadas con las operaciones de Préstamo
  describe('Operaciones de Prestamo', () => {

    it('should post a new Prestamo', () => {
      // Simula el envío de un nuevo préstamo y verifica la respuesta
      const dummyPrestamo: Prestamo = {
        // Datos del préstamo a enviar
        id_cliente: 1,
        monto: 5000,
        plazo_meses: 12,
        interes: 0.05
      };

      service.postPrestamo(dummyPrestamo).subscribe(prestamo => {
        // Verifica si se recibe el préstamo esperado como respuesta
        expect(prestamo).toEqual(dummyPrestamo);
      });

      const req = httpMock.expectOne(_URL_POST_PRESTAMO);
      expect(req.request.method).toBe('POST');
      req.flush(dummyPrestamo);
    });
  });
});
