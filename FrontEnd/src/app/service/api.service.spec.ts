import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { _URL_GET_CLIENTES, _URL_GET_CLIENTE_BY_ID, _URL_GET_PRESTAMOS_CLIENTE, _URL_POST_CLIENTE, _URL_POST_PRESTAMO } from '../config/config';
import { Cliente } from '../models/Cliente';
import { Prestamo } from '../models/Prestamo';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Creación de elementos', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Operaciones de Cliente', () => {

    it('should get all Clientes', () => {
      service.getAllClientes().subscribe();

      const req = httpMock.expectOne(_URL_GET_CLIENTES);
      expect(req.request.method).toBe('GET');
    });

    it('should get a Cliente by id_cliente', () => {
      const id_cliente = 1;
      service.getClienteById(id_cliente).subscribe();

      const req = httpMock.expectOne(`${_URL_GET_CLIENTE_BY_ID}/${id_cliente}`);
      expect(req.request.method).toBe('GET');
    });

    it('should post a new Cliente', () => {
      const dummyCliente: Cliente = {
        nombre: 'Juan',
        rfc: 'GOMJ880406',
        edad: 35,
        fecha_alta: '2023-10-29',
        telefono: '4491234567',
        correo: 'juan@gmail.com'
      };

      service.postCliente(dummyCliente).subscribe(cliente => {
        expect(cliente).toEqual(dummyCliente);
      });

      const req = httpMock.expectOne(_URL_POST_CLIENTE);
      expect(req.request.method).toBe('POST');
      req.flush(dummyCliente);
    });

    it('should get all Prestamos of a Cliente by id_cliente', () => {
      const id_cliente = 1;
      const dummyPrestamos: Prestamo[] = [
        { id_prestamo: 1, id_cliente: id_cliente, monto: 5000, plazo_meses: 12, interes: 0.05 },
        { id_prestamo: 2, id_cliente: id_cliente, monto: 3000, plazo_meses: 6, interes: 0.03 },
      ];

      service.getPrestamosCliente(id_cliente).subscribe(prestamos => {
        expect(prestamos.length).toBe(2);
        expect(prestamos).toEqual(dummyPrestamos);
      });

      const req = httpMock.expectOne(`${_URL_GET_PRESTAMOS_CLIENTE}/${id_cliente}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyPrestamos);
    });
  });

  describe('Operaciones de Prestamo', () => {

    it('should post a new Prestamo', () => {
      const dummyPrestamo: Prestamo = {
        id_cliente: 1,
        monto: 5000,
        plazo_meses: 12,
        interes: 0.05
      };

      service.postPrestamo(dummyPrestamo).subscribe(prestamo => {
        expect(prestamo).toEqual(dummyPrestamo);
      });

      const req = httpMock.expectOne(_URL_POST_PRESTAMO);
      expect(req.request.method).toBe('POST');
      req.flush(dummyPrestamo);
    });
  });
});
