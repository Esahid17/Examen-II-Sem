import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {
  clientForm: FormGroup = new FormGroup({
    id_cliente: new FormControl(''),
    monto: new FormControl(''),
    plazo_meses: new FormControl(''),
    interes: new FormControl('')
  });

  totalPago: number = 0;
  resultados: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.clientForm = this.fb.group({
      id_cliente: [null, Validators.required],
      monto: [null, Validators.required],
      plazo_meses: [null, Validators.required],
      interes: [null, Validators.required],
    });

  }

  onRegistroClick() {
    // Aquí puedes definir la lógica para el botón de Registro
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/register"]);
  }

  onConsultaClick() {
    // Aquí puedes definir la lógica para el botón de Consulta
    this.router.navigate(["/"]);
    console.log('Botón de Consulta clickeado');
  }

  calcular() {
    if (this.clientForm.valid) {
      const monto = this.clientForm.get('monto')?.value;
      const plazos = this.clientForm.get('plazo_meses')?.value;
      const interes = this.clientForm.get('interes')?.value / 100;
      const interesFijo = this.clientForm.get('interes')?.value
      const total = monto + (monto * interes)
      this.totalPago = total;
      console.log("total: ", total)
      const cuota = total / plazos;

      this.resultados = [];
      let saldo = total;

      for (let i = 1; i <= plazos; i++) {
        const interesMensual = saldo * interes;
        const capitalMensual = cuota - interesFijo;
        saldo -= cuota;

        this.resultados.push({
          periodo: i,
          cuota: cuota.toFixed(2),
          interes: interesFijo.toFixed(2),
          capital: capitalMensual.toFixed(2),
          saldo: saldo.toFixed(2),
        });
      }
    }
  }

  buscarCliente() {
    const id_cliente = this.clientForm.get('id_cliente')?.value;

    this.apiService.getClienteById(id_cliente).subscribe((response) => {
      if (response) {
        console.log("Respuesta: ", response)
        Swal.fire({
          title: 'Cliente encontrado',
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

  creditoAprobado() {
    // Guardar en la base de datos
    if (this.clientForm.valid) {
      console.log("Formulario: ", this.clientForm.value)

      this.apiService.postPrestamo(this.clientForm.value).subscribe((response) => {
        if (response) {
          console.log("Respuesta: ", response)
          Swal.fire({
            title: 'Crédito aprobado',
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

}
