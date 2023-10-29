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
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creación de elementos', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create the registration form', () => {
      expect(component.formularioRegistro.contains('nombre')).toBeTruthy();
      expect(component.formularioRegistro.contains('rfc')).toBeTruthy();
      expect(component.formularioRegistro.contains('edad')).toBeTruthy();
      expect(component.formularioRegistro.contains('fecha_alta')).toBeTruthy();
      expect(component.formularioRegistro.contains('telefono')).toBeTruthy();
      expect(component.formularioRegistro.contains('correo')).toBeTruthy();
    });
  });

  describe('Validación del formulario de registro', () => {

    it('should make the nombre field required', () => {
      let control = component.formularioRegistro.get('nombre');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the rfc field required', () => {
      let control = component.formularioRegistro.get('rfc');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the edad field required', () => {
      let control = component.formularioRegistro.get('edad');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the fecha_alta field required', () => {
      let control = component.formularioRegistro.get('fecha_alta');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the telefono field required', () => {
      let control = component.formularioRegistro.get('telefono');
      if (control) {
        control.setValue('');
        expect(control.valid).toBeFalsy();
      } else {
        fail('Control is null');
      }
    });

    it('should make the correo field required', () => {
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
