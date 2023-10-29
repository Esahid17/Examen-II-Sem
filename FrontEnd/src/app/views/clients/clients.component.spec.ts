import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsComponent } from './clients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    // Configuración de las pruebas
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent], // Componente a probar
      imports: [
        HttpClientTestingModule, // Módulo para simular peticiones HTTP
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba relacionada con la creación del componente Clients
  describe('Creación de elementos', () => {
    it('should create', () => {
      // Verifica si el componente se ha creado exitosamente
      expect(component).toBeTruthy();
    });

    it('should create the client form', () => {
      // Simula la creación del formulario de cliente y sus campos
      component.clientForm.get('monto')?.enable();
      component.clientForm.get('plazo_meses')?.enable();
      component.clientForm.get('interes')?.enable();

      // Verifica la existencia de los campos en el formulario
      expect(component.clientForm.contains('id_cliente')).toBeTruthy();
      expect(component.clientForm.contains('monto')).toBeTruthy();
      expect(component.clientForm.contains('plazo_meses')).toBeTruthy();
      expect(component.clientForm.contains('interes')).toBeTruthy();

      // Deshabilita los campos del formulario
      component.clientForm.get('monto')?.disable();
      component.clientForm.get('plazo_meses')?.disable();
      component.clientForm.get('interes')?.disable();
    });
  });

  // Pruebas relacionadas con la validación del formulario de cliente
  describe('Validación del formulario cliente', () => {
    // Pruebas para verificar campos requeridos en el formulario
    it('should make the id_cliente field required', () => {
      // Simula el campo id_cliente del formulario
      let control = component.clientForm.get('id_cliente');
      if (control) {
        // Establece el campo como vacío y verifica si es inválido
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the monto field required', () => {
      // Simula el campo monto del formulario
      let control = component.clientForm.get('monto');
      if (control) {
        // Habilita y establece el campo como vacío para verificar si es inválido
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the plazo_meses field required', () => {
      // Simula el campo plazo_meses del formulario
      let control = component.clientForm.get('plazo_meses');
      if (control) {
        // Habilita y establece el campo como vacío para verificar si es inválido
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the interes field required', () => {
      // Simula el campo interes del formulario
      let control = component.clientForm.get('interes');
      if (control) {
        // Habilita y establece el campo como vacío para verificar si es inválido
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });
  });

  // Pruebas relacionadas con operaciones de búsqueda y crédito
  describe('Operaciones de búsqueda', () => {
    it('should search for a client when buscarCliente is called', () => {
      // Simula la llamada a la función de búsqueda de cliente
      const id_cliente = 1;
      component.clientForm.get('id_cliente')?.setValue(id_cliente);
      const spy = spyOn(apiService, 'getClienteById').and.callThrough();
      component.buscarCliente();
      expect(spy).toHaveBeenCalledWith(id_cliente);
    });
  });

  describe('Operaciones de crédito', () => {
    it('should approve a prestamo when creditoAprobado is called', () => {
      // Simula la llamada a la función de aprobación de crédito
      component.clientForm.setValue({
        id_cliente: 1,
        monto: 5000,
        plazo_meses: 12,
        interes: 0.05
      });

      const spy = spyOn(apiService, 'postPrestamo').and.callThrough();
      component.creditoAprobado();
      expect(spy).toHaveBeenCalled();
    });
  });
});
