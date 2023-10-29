import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    // Configuración de pruebas
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent], // Componente a probar
      imports: [
        HttpClientTestingModule, // Módulo para simular peticiones HTTP
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Pruebas relacionadas con la creación del componente Register
  describe('Creación de elementos', () => {
    it('should create', () => {
      // Verifica si el componente se ha creado exitosamente
      expect(component).toBeTruthy();
    });

    it('should create the registration form', () => {
      // Verifica la existencia de campos en el formulario de registro
      expect(component.formularioRegistro.contains('nombre')).toBeTruthy();
      expect(component.formularioRegistro.contains('rfc')).toBeTruthy();
      expect(component.formularioRegistro.contains('edad')).toBeTruthy();
      expect(component.formularioRegistro.contains('fecha_alta')).toBeTruthy();
      expect(component.formularioRegistro.contains('telefono')).toBeTruthy();
      expect(component.formularioRegistro.contains('correo')).toBeTruthy();
    });
  });

  // Pruebas relacionadas con la validación del formulario de registro
  describe('Validación del formulario de registro', () => {
    // Pruebas para verificar campos requeridos en el formulario
    it('should make the nombre field required', () => {
      // Simula el campo nombre del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('nombre');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the rfc field required', () => {
      // Simula el campo rfc del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('rfc');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the edad field required', () => {
      // Simula el campo edad del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('edad');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the fecha_alta field required', () => {
      // Simula el campo fecha_alta del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('fecha_alta');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the telefono field required', () => {
      // Simula el campo telefono del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('telefono');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the correo field required', () => {
      // Simula el campo correo del formulario y verifica si es inválido cuando está vacío
      let control = component.formularioRegistro.get('correo');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });
  });
});
