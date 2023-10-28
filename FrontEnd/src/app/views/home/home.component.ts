import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  resultados: any[] = [];
  prestamos: any
  prestamoInvididual : any

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

  mostrarTabla(idClient: any){
   
    this.apiService.getPrestamosCliente(parseInt(idClient)).subscribe(
      (response : any ) => {
        //console.log("Prestamos cliente: ", response)
        this.prestamos = response
        console.log("prestamos: ", this.prestamos)
        console.log(" this.prestamos.length: ", this.prestamos.length)

        if (this.prestamos.length === 0) {
          console.log("ente a condioandfasiojadsfiojf")
          // Muestra un SweetAlert con el mensaje "No tiene crédito"
          Swal.fire({
            icon: "error",
            text: "Este Usuario no cuenta con algun credito",
            timer : 3000
          })
          
        }else{

        


        
        let Html = ''
        let Html2 = ''
    
        for (let i = 0; i <  this.prestamos.length; i++) {
          Html2 = ''
          var monto = this.prestamos[i].monto
          var plazos  = this.prestamos[i].plazo_meses
          var interes  = this.prestamos[i].interes / 100
          var interesFijo  = this.prestamos[i].interes
          var total = monto + (monto * interes)
          
          console.log("total: ", total)
          var cuota = total / plazos;
      
          this.prestamoInvididual = []
          let saldo = total;
          for (let i = 1; i <= plazos; i++) {
            const capitalMensual = cuota - interesFijo;
            saldo -= cuota;
            
            Html2 += `
            <tr>
            <td>${ i }</td>
            <td>${ cuota.toFixed(2) }</td>
            <td>${ interesFijo.toFixed(2) }</td>
            <td>${ capitalMensual.toFixed(2) }</td>
            <td>${ saldo.toFixed(2)}</td>
            </tr>
            `
            this.prestamoInvididual.push({
              periodo: i,
              cuota: cuota.toFixed(2),
              interes: interesFijo.toFixed(2),
              capital: capitalMensual.toFixed(2),
              saldo: saldo.toFixed(2),
            });
          }
          console.log("prestamoInvividual: ", this.prestamoInvididual)



          Html += `
          <table class="table">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Cuota</th>
                <th>Interés</th>
                <th>Capital</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
             ${Html2}
            </tbody>
          </table>
          
          `;
        }
    
        Swal.fire({
          title: 'Prestamos',
          html: `
          <style type="text/css">
          .swal2-title {
            color: white; 
            padding: 15px;
            background-color: grey;
          }
          
          .close-button {
            position: absolute;
            
             top: 5px;
            right: 10px;
            cursor: pointer;
          }
          .close-button:hover {
            
          }
          .swal2-content {
            font-size: 16px;
          }
          .swal2-popup {
            width: 800px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background-color: #f2f2f2;
            color: #212A45;
            font-weight: bold;
            text-align: left;
            padding: 10px;
          }
          td {
            padding: 10px;
           
          }
          .copy-button {
            background-color: #212A45;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          }
        </style>
            
        ${Html}
        
          `,
          confirmButtonColor: '#212A45',
          confirmButtonText: 'Aceptar'
        });
    
      }
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

  onHomeClick() {
    console.log('Botón de Consulta clickeado');
    this.router.navigate([""]);
  }

}
