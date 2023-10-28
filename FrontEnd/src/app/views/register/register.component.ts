import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  formularioRegistro: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    rfc: new FormControl(''),
    edad: new FormControl(''),
    fecha_alta: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      edad: [null, Validators.required],
      fecha_alta: [null, Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  registro() {
    if (this.formularioRegistro.valid) {
      console.log("Formulario: ", this.formularioRegistro.value)

      this.apiService.postCliente(this.formularioRegistro.value).subscribe((response) => {
        if (response) {
          console.log("Respuesta: ", response)
        }
      },
        (error) => {
          console.log("Error: ", error)
        }
      )
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
