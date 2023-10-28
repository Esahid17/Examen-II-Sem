import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { Prestamo } from '../models/Prestamo';
import {
  _URL_POST_CLIENTE, _URL_GET_CLIENTES, _URL_GET_CLIENTE_BY_ID,
  _URL_PUT_CLIENTE_BY_ID, _URL_DELETE_CLIENTE_BY_ID, _URL_GET_PRESTAMOS_CLIENTE,
  _URL_POST_PRESTAMO, _URL_GET_PRESTAMOS, _URL_GET_PRESTAMO_BY_ID,
  _URL_PUT_PRESTAMO_BY_ID, _URL_DELETE_PRESTAMO_BY_ID
} from '../config/config';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private httpClient: HttpClient) { }

  postCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(_URL_POST_CLIENTE, cliente);
  }

  getAllClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(_URL_GET_CLIENTES);
  }

  getClienteById(idCliente: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(_URL_GET_CLIENTE_BY_ID + '/' + idCliente);
  }

  getPrestamosCliente(idCliente: number): Observable<Prestamo[]> {
    return this.httpClient.get<Prestamo[]>(_URL_GET_PRESTAMOS_CLIENTE + '/' + idCliente);
  }

  updateClienteById(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(_URL_PUT_CLIENTE_BY_ID, cliente);
  }

  deleteClienteById(idCliente: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(_URL_DELETE_CLIENTE_BY_ID + '/' + idCliente);
  }

  postPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.httpClient.post<Prestamo>(_URL_POST_PRESTAMO, prestamo);
  }

  getAllPrestamos(): Observable<Prestamo[]> {
    return this.httpClient.get<Prestamo[]>(_URL_GET_PRESTAMOS);
  }

  getPrestamoById(idPrestamo: number): Observable<Prestamo> {
    return this.httpClient.get<Prestamo>(_URL_GET_PRESTAMO_BY_ID + '/' + idPrestamo);
  }

  updatePrestamoById(prestamo: Prestamo): Observable<Prestamo> {
    return this.httpClient.put<Prestamo>(_URL_PUT_PRESTAMO_BY_ID, prestamo);
  }

  deletePrestamoById(idPrestamo: number): Observable<Prestamo> {
    return this.httpClient.delete<Prestamo>(_URL_DELETE_PRESTAMO_BY_ID + '/' + idPrestamo);
  }
}