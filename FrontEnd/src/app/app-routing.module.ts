import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RegisterComponent } from './views/register/register.component';
import { ClientsComponent } from './views/clients/clients.component';

const routes: Routes = [
  { path : '', component:RegisterComponent},
  { path : 'register', component:RegisterComponent},
  { path : 'clients', component:ClientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
