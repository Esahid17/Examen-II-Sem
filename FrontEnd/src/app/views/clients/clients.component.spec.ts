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
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule]
    })
      .compileComponents();

    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación de elementos', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create the client form', () => {
      component.clientForm.get('monto')?.enable();
      component.clientForm.get('plazo_meses')?.enable();
      component.clientForm.get('interes')?.enable();

      expect(component.clientForm.contains('id_cliente')).toBeTruthy();
      expect(component.clientForm.contains('monto')).toBeTruthy();
      expect(component.clientForm.contains('plazo_meses')).toBeTruthy();
      expect(component.clientForm.contains('interes')).toBeTruthy();

      component.clientForm.get('monto')?.disable();
      component.clientForm.get('plazo_meses')?.disable();
      component.clientForm.get('interes')?.disable();
    });
  });

  describe('Validación del formulario cliente', () => {
    it('should make the id_cliente field required', () => {
      let control = component.clientForm.get('id_cliente');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the monto field required', () => {
      let control = component.clientForm.get('monto');
      if (control) {
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the plazo_meses field required', () => {
      let control = component.clientForm.get('plazo_meses');
      if (control) {
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the interes field required', () => {
      let control = component.clientForm.get('interes');
      if (control) {
        control.enable();
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });
  });

  describe('Operaciones de búsqueda', () => {
    it('should search for a client when buscarCliente is called', () => {
      const id_cliente = 1;
      component.clientForm.get('id_cliente')?.setValue(id_cliente);
      const spy = spyOn(apiService, 'getClienteById').and.callThrough();
      component.buscarCliente();
      expect(spy).toHaveBeenCalledWith(id_cliente);
    });
  });

  describe('Operaciones de crédito', () => {
    it('should approve a prestamo when creditoAprobado is called', () => {
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
