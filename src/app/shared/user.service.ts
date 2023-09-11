import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Opinion } from '../models/opinion';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string = 'http://localhost:3000';
  public is_Tatuador: boolean;
  public user: User;
  public logueado: boolean = false;
  public artistas: User[];
  public idUser: number;
  public usuarioSeleccionado: User;

  constructor(private http: HttpClient) {
    this.is_Tatuador;
    this.user = new User();
    this.logueado = true;
  }

  obtenerIdCliente(email: string): Observable<any> {
    return this.http.get(`${this.url}/user/${email}`);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/registro`, user);
  }

  public edit(usuario: User): Observable<any> {
    let url = `${this.url}/edit-profile-tatuador`;
    return this.http.put(url, usuario);
  }

  public login(user: User): Observable<any> {
    let url = `${this.url}/login`;
    return this.http.post(url, user);
  }

  public getArtistas(): Observable<any> {
    let url = `${this.url}/descubrir-artista`;
    return this.http.get(url);
  }

  public perfilArtista(tatuador: User): Observable<any> {
    let url = `${this.url}/profile-tatuador-externa/${tatuador.id_user}`;
    console.log(url);
    return this.http.get(url);
  }

  public getTatuadorInfo(): Observable<any> {

    return this.http.get(`${this.url}/profile-tatuador-propia/${this.user.id_user}`);
  }

  public getTatuadorInfo2(): Observable<any> {
    return this.http.get(`${this.url}/profile-tatuador-externa/${this.usuarioSeleccionado.id_user}`);
  }

  public checkFollow(id_user: number): Observable<any> {
    
    const url = `${this.url}/user/check/${this.user.id_user}/${id_user}`;
    
    return this.http.get<any>(url)
  }

  public followUser(id_user: number): Observable<any> {
    
    const url = `${this.url}/user/follow/${this.user.id_user}/${id_user}`;
    return this.http.post<any>(url, {});
  }

  public unfollowUser(id_user: number): Observable<any> {
    
    const url = `${this.url}/user/unfollow/${this.user.id_user}/${id_user}`;
    return this.http.post<any>(url, {});
  }

  public getCitas(user: number): Observable<any> {
    return this.http.get(`${this.url}/citas/${user}`);
  }

  public buscarTatuador(inputValue: string): Observable<any> {
    let url = `${this.url}/explorar/search?search=${inputValue}`;
    return this.http.get(url);
  }
  public deleteCardPerfil(idPhoto: number): Observable<any> {

    let url = `${this.url}/profile-tatuador-propia`;
    const httpOptions = { headers: null, body: { id_photo: idPhoto } };
    return this.http.delete(url, httpOptions);
  }

  public enviarOpinion(opinion: Opinion): Observable<any> {
    const url = `${this.url}/estrellas`;
    return this.http.post(url, opinion);
  }

  public borrarOpinion(id_opiniones: number): Observable<any> {
    let url = `${this.url}/estrellas/${id_opiniones}`;
    return this.http.delete(url);
  }

  public getOpiniones(receptor: number): Observable<any> {
    const url = `${this.url}/opiniones/${receptor}`;
    return this.http.get(url);
  }
  getInfoArtista(id_user:number){
    return this.http.get(`${this.url}/chats/${id_user}`)
  }
  public enviarRespuesta(opinion: Opinion): Observable<any> {
    const url = `${this.url}/opiniones/${opinion.id_opiniones}`;
    const data = { respuestaTatuador: opinion.respuestaTatuador};
    return this.http.put(url, data);
  }
  public getPuntuacionMedia(id_user: number): Observable<any> {
    return this.http.get<any>(`${this.url}/profile-tatuador-externa/${id_user}`);
  }

  
}
