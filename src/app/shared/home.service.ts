import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicaciones } from '../models/publicaciones';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public url: string = 'http://localhost:3000';
  public publicaciones:Publicaciones[];
  constructor(private http: HttpClient) {}

  getUserPhotos(id_user: number): Observable<any> {
    return this.http.get(`${this.url}/home/photos/${id_user}`);
  }

  getInfoArtista(id_user:number){
    return this.http.get(`${this.url}/home/${id_user}`)
  }
  searchPhotos(id_user: number, search: string): Observable<any> {
    return this.http.get(`${this.url}/home/search/${id_user}/${search}`)
  }
}
