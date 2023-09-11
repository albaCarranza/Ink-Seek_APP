// En el componente del cliente
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) { }

  uploadImage(imageData: FormData) {
    const userId = this.userService.user.id_user;
    imageData.append('id_user', userId.toString());

    return this.http.post<any>(`${this.url}/upload`, imageData);
  }
}