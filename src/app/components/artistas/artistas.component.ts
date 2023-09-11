import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/models/publicacion';
import { Respuesta } from 'src/app/models/respuesta';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent {
  public publicaciones: Publicacion[];
  public user: User;
  @Input() artistaPadre: User;

  constructor(private router: Router, public userService: UserService) {
    this.user = this.userService.user;
  }

  verPerfil() {
      if(this.artistaPadre.id_user == this.user.id_user){
        this.router.navigate(['/profile-tatuador-propia']);
      }else{
        this.userService.usuarioSeleccionado = this.artistaPadre;
        this.userService.checkFollow(this.artistaPadre.id_user).subscribe((isFollowed: boolean) => {
        this.userService.usuarioSeleccionado.seguido = isFollowed;
        })
        this.router.navigate(['/profile-tatuador-externa']);
            
      }
    }
  }

