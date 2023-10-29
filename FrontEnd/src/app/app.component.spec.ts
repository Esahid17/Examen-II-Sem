import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from './models/Cliente';
import { Prestamo } from './models/Prestamo';

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

  /*
  it('should post new cliente', () => {
    const cliente: Cliente = {
      id_cliente: 1,
      nombre: 'John Doe',
      rfc: 'CAGE010717Q70',
      edad: 12,
      fecha_alta: new Date('2001-10-12'),
      telefono: '1234567890',
      correo: 'johndoe@example.com'
    };

    const apiService = TestBed.inject(ApiService);

    // Crear un espía para el método postCliente
    const postSpy = spyOn(apiService, 'postCliente').and.callThrough();

    apiService.postCliente(cliente).subscribe((response) => {
      expect(response).toEqual(cliente);

      // Verificar que el método postCliente fue llamado
      expect(postSpy).toHaveBeenCalled();

      // Verificar que el método postCliente fue llamado con el cliente correcto
      expect(postSpy).toHaveBeenCalledWith(cliente);
    });
  });
  */


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

  it('should get a Cliente by id', () => {
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
    });
  });

  /*

  it('should update a Cliente by id', () => {
    const cliente: Cliente = {
      id_cliente: 1,
      nombre: 'John Doe Updated',
      rfc: 'CAGE010717Q70',
      edad: 13,
      fecha_alta: '2023-10-27',
      telefono: '1234567890',
      correo: 'johndoeupdated@example.com'
    };

    const apiService: ApiService = TestBed.inject(ApiService);

    // Crear un espía para el método updateClienteById
    const updateClienteByIdSpy = spyOn(apiService, 'updateClienteById').and.callThrough();

    apiService.updateClienteById(cliente).subscribe((response) => {
      expect(response).toEqual(cliente);

      // Verificar que el método updateClienteById fue llamado
      expect(updateClienteByIdSpy).toHaveBeenCalled();

      // Verificar que el método updateClienteById fue llamado con el cliente correcto
      expect(updateClienteByIdSpy).toHaveBeenCalledWith(cliente);
    });
  });

it('should delete a Cliente by id', (done: DoneFn) => {
  const id_cliente = 1;

  const cliente: Cliente = {
    id_cliente: id_cliente,
    nombre: 'John Doe',
    rfc: 'CAGE010717Q70',
    edad: 30,
    fecha_alta: '2023-10-27',
    telefono: '1234567890',
    correo: 'johndoe@example.com'
  };

  const prestamo: Prestamo = {
    id_prestamo: 1,
    id_cliente: id_cliente,
    monto: 5000,
    plazo_meses: 12,
    interes: 0.05
  };

  const apiService: ApiService = TestBed.inject(ApiService);

  // Crear un espía para el método deleteClienteById
  const deleteClienteByIdSpy = spyOn(apiService, 'deleteClienteById').and.callThrough();

  // Supongamos que ya has creado un cliente y préstamos relacionados...

  apiService.deleteClienteById(id_cliente).subscribe((response) => {
    expect(response).toBeTruthy();

    // Verificar que el método deleteClienteById fue llamado
    expect(deleteClienteByIdSpy).toHaveBeenCalled();

    // Verificar que el método deleteClienteById fue llamado con el id_cliente correcto
    expect(deleteClienteByIdSpy).toHaveBeenCalledWith(id_cliente);

    // Aquí deberías verificar que el cliente y los préstamos fueron eliminados...

    done();
  });
});
*/

});
