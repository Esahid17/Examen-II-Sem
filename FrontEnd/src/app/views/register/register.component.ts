import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  formularioRegistro: FormGroup = new FormGroup({
    nombreCompleto: new FormControl(''),
    rfc: new FormControl(''),
    edad: new FormControl(''),
    fechaAlta: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router) {
    this.formularioRegistro = this.fb.group({
      nombreCompleto: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      edad: [null, Validators.required],
      fechaAlta: [null, Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  registro() {
    if (this.formularioRegistro.valid) {
      console.log("Es valido ")
      var formulario = this.formularioRegistro.value
      console.log("Formulario: ", formulario)
    }
  }

  onRegistroClick() {
    // Aquí puedes definir la lógica para el botón de Registro
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/clients"]);
  }

  onConsultaClick() {
    // Aquí puedes definir la lógica para el botón de Consulta
    this.router.navigate(["/"]);
    console.log('Botón de Consulta clickeado');
  }

}
