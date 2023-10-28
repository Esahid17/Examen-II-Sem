import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private router: Router) { }

  onRegistroClick() {
    console.log('Botón de Registro clickeado');
    this.router.navigate(["/register"]);
  }

  onConsultaClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate(["/clients"]);
  }

}
