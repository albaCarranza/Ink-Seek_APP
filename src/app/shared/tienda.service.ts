import { Injectable } from '@angular/core';
import { Prenda } from '../models/prenda';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { Respuesta } from '../models/respuesta';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url = "http://localhost:3000/tienda"
  private url2 = "http://localhost:3000/tiendas"
  public prendas: Prenda[] = [];
  constructor(private http : HttpClient, private userService : UserService) {
   }

   getAll(id_user : number){
    console.log(id_user);
    return this.http.get(`${this.url}?id_user=${id_user}`)
   }

   getAllUserExterno(id_user : number){
    console.log(id_user)
    return this.http.get(`${this.url2}?id_user=${id_user}`)
   }


   add(prenda: Prenda): Observable<any> {
    return this.http.post(this.url, prenda);
  }

   delete(id_producto: number): Observable<any> {
    console.log("servicio");
    console.log(id_producto);
    return this.http.delete(`${this.url}/${id_producto}`).pipe(
      tap(() => {
        // Realizar una nueva solicitud para obtener la lista actualizada de productos después de eliminar uno
        this.getAll(this.userService.user.id_user).subscribe(
          (respuesta: Respuesta) => {
            this.prendas = respuesta.data_prenda;
          },
          (error) => {
            console.error("Error al obtener la lista de productos:", error);
          }
        );
      })
    );
  }
   }
  
