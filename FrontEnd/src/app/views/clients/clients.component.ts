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
  clienteEncontrado: boolean = false;
  clientForm: FormGroup;
  nombreCliente: any;

  totalPago: number = 0;
  resultados: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.clientForm = this.fb.group({
      id_cliente: [{ value: '', disabled: false }, Validators.required],
      monto: [{ value: '', disabled: !this.clienteEncontrado }, Validators.required],
      plazo_meses: [{ value: '', disabled: !this.clienteEncontrado }, Validators.required],
      interes: [{ value: '', disabled: !this.clienteEncontrado }, Validators.required],
    });
  }

  onRegistroClick() {
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/register"]);
  }

  onConsultaClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate(["/clients"]);
  }

  onHomeClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate([""]);
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
      if (response && typeof response !== 'string') {
        Swal.fire({
          title: 'Cliente encontrado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        console.log("Respuesta: ", response);
        this.clienteEncontrado = true;

        this.nombreCliente = response.nombre;

        this.clientForm.get('monto')?.enable();
        this.clientForm.get('plazo_meses')?.enable();
        this.clientForm.get('interes')?.enable();
      } else {
        Swal.fire({
          title: 'Cliente no encontrado',
          text: 'El cliente no existe en la base de datos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });

        this.clienteEncontrado = false;
        this.clientForm.get('monto')?.reset();
        this.clientForm.get('plazo_meses')?.reset();
        this.clientForm.get('interes')?.reset();
        this.clientForm.get('monto')?.disable();
        this.clientForm.get('plazo_meses')?.disable();
        this.clientForm.get('interes')?.disable();
      }
    });
  }

  creditoAprobado() {
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
