import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {
  clientForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    monto: new FormControl(''),
    plazos: new FormControl(''),
    interes: new FormControl('')
  });

  resultados: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.clientForm = this.fb.group({
      id: [null, Validators.required], // Otra opción es asignar valores iniciales adecuados
      monto: [null, Validators.required],
      plazos: [null, Validators.required],
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

  buscar() {
    if (this.clientForm.valid) {
      const monto = this.clientForm.get('monto')?.value;
      const plazos = this.clientForm.get('plazos')?.value;
      const interes = this.clientForm.get('interes')?.value / 100;
      const interesFijo = this.clientForm.get('interes')?.value
      const total = monto + (monto * interes)
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
  creditoAprobado() {

  }

}
