import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  resultados: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {

    this.apiService.getAllClientes().subscribe((response) => {
      console.log("Respuesta: ", response)
      this.resultados = response;
    },
      (error) => {
        console.log("Error: ", error)
      }
    )
  }

  onRegistroClick() {
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/register"]);
  }

  onConsultaClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate(["/clients"]);
  }

}
