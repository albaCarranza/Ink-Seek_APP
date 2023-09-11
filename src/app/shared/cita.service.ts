import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private url = "http://localhost:3000";
  cita: any;

  constructor(private http: HttpClient) {}

  addCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(`${this.url}/add-cita`, cita);
  }

  updateCita(cita: Cita): Observable<any> {
    const url = `${this.url}/cita/${cita.id_cita}`;
    return this.http.put(url, cita);
  }

  getCitas(id_user: number): Observable<{ error: boolean, codigo: number, mensaje: string, data_citas: Cita[] }> {
    const url = `${this.url}/citas/${id_user}`;
    return this.http.get<{ error: boolean, codigo: number, mensaje: string, data_citas: Cita[] }>(url);
  }
  getCitasEmail(email: number): Observable<{ error: boolean, codigo: number, mensaje: string, data_citas: Cita[] }> {
    const url = `${this.url}/citas/email/${email}`;
    return this.http.get<{ error: boolean, codigo: number, mensaje: string, data_citas: Cita[] }>(url);
  }
  
  getCitaById(id_cita: number): Observable<{ error: boolean, codigo: number, mensaje: string, data_cita: Cita }> {
    const url = `${this.url}/cita/${id_cita}`;
    return this.http.get<{ error: boolean, codigo: number, mensaje: string, data_cita: Cita }>(url);
  }
  deleteCita(id_cita: number): Observable<any> {
    const url = `${this.url}/cita/${id_cita}`;
    return this.http.delete(url);
  }
}
