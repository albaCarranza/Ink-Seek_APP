import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Publicaciones } from 'src/app/models/publicaciones';
import { Respuesta } from 'src/app/models/respuesta';
import { User } from 'src/app/models/user';
import { HomeService } from 'src/app/shared/home.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent {
  public user:User;
  @Input() publicacionPadre:Publicaciones
  constructor(public router:Router, public userService:UserService, public homeService:HomeService){
    this.user=this.userService.user;
  }
  verPerfil(){  
    this.homeService.getInfoArtista(this.publicacionPadre.id_user)
    .subscribe((res:any) => {
      this.userService.usuarioSeleccionado = res.data_user[0]
      this.router.navigate(['/profile-tatuador-externa']);
      this.userService.checkFollow(this.publicacionPadre.id_user).subscribe((isFollowed: boolean) => {
        this.userService.usuarioSeleccionado.seguido = isFollowed;
    })
  })
}
}
