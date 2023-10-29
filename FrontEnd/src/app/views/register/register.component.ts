import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  formularioRegistro: FormGroup;

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
      console.log("Fecha formulario", this.formularioRegistro.value.fecha_alta)

      this.apiService.postCliente(this.formularioRegistro.value).subscribe((response : any) => {
        if (response) {
          console.log("Respuesta: ", response)
          var respuesta = response
          Swal.fire({
            title: 'Cliente registrado',
            html: `Nombre del cliente: ` + `<b>${respuesta.newCliente.nombre}</b>`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
      },
        (error) => {
          console.log("Error: ", error)
        }
      )
    }
  }

  onRegistroClick() {
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/register"]);
  }

  onConsultaClick() {
    this.router.navigate(["/clients"]);
    console.log('Botón de Consulta clickeado');
  }

  onHomeClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate([""]);
  }

}
