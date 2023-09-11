import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Publicacion } from 'src/app/models/publicacion';
import { Respuesta } from 'src/app/models/respuesta';
import { RespuestaChat } from 'src/app/models/respuesta-chat';
import { User } from 'src/app/models/user';
import { ChatsService } from 'src/app/shared/chats.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile-tatuador-externa',
  templateUrl: './profile-tatuador-externa.component.html',
  styleUrls: ['./profile-tatuador-externa.component.css']
})
export class ProfileTatuadorExternaComponent implements OnInit{
  public publicaciones: Publicacion[] = [];
  public puntuacionMedia: number = 0;
  public hasPuntuaciones = true;
  public usuarioSeleccionado: User;
  public chatCreado : Chat
  public starClasses: string[] = [];

  constructor(private router: Router, public userService: UserService, public chatService: ChatsService) {
    
    this.usuarioSeleccionado = this.userService.usuarioSeleccionado; 
    this.userService.getTatuadorInfo2().subscribe((respuesta: Respuesta) => {
    this.usuarioSeleccionado.publicaciones = respuesta.data_foto;

      });  
  }
  ngOnInit(): void {
    this.usuarioSeleccionado = this.userService.usuarioSeleccionado;
    this.userService.getPuntuacionMedia(this.userService.usuarioSeleccionado.id_user).subscribe((respuesta: Respuesta) => {
      if (respuesta.puntuacion_media !== null) {
        this.puntuacionMedia = Number(respuesta.puntuacion_media);
        this.hasPuntuaciones = true;
        // Llamamos a la función para actualizar las clases de las estrellas
        this.actualizarClasesEstrellas();
      } else {
        this.hasPuntuaciones = false;
      }
    });
  }
  

  actualizarClasesEstrellas() {
    const puntuacionEntera = Math.floor(this.puntuacionMedia);
    const decimal = this.puntuacionMedia - puntuacionEntera;
    const porcentajeRelleno = decimal * 100;
  
    this.starClasses = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= puntuacionEntera) {
        // Estrella completa
        this.starClasses.push('fas fa-star');
      } else if (i === puntuacionEntera + 1) {
        // Estrella con relleno según el porcentaje decimal
        const className = this.getStarClassNameByPercentage(porcentajeRelleno);
        this.starClasses.push(className);
      } else {
        // Estrella vacía
        this.starClasses.push('far fa-star');
      }
    }
  }
  
  getStarClassNameByPercentage(percentage: number): string {
    if (percentage >= 95) {
      return 'fas fa-star';
    } else if (percentage >= 85) {
      return 'fas fa-star star-85';
    } else if (percentage >= 75) {
      return 'fas fa-star star-75';
    } else if (percentage >= 65) {
      return 'fas fa-star star-65';
    } else if (percentage >= 55) {
      return 'fas fa-star star-55';
    } else if (percentage >= 45) {
      return 'fas fa-star star-45';
    } else if (percentage >= 35) {
      return 'fas fa-star star-35';
    } else if (percentage >= 25) {
      return 'fas fa-star star-25';
    } else if (percentage >= 15) {
      return 'fas fa-star star-15';
    } else {
      return 'far fa-star';
    }
  }
  toggleFollow() {
    if (this.userService.usuarioSeleccionado.seguido) {
      this.unfollowUser(this.usuarioSeleccionado.id_user);
    } else {
      this.followUser(this.usuarioSeleccionado.id_user);
    }
  }
  
  followUser(id_user: number) {
    this.userService.followUser(id_user).subscribe(
      (response) => {
        this.userService.usuarioSeleccionado.seguido = true;
      }
    );
  }
  
  unfollowUser(id_user: number) {
    this.userService.unfollowUser(id_user).subscribe(
      (response) => {
        this.userService.usuarioSeleccionado.seguido = false;
      }
    );
  }
  
  quitarCaja(){
    }
  
  crearChat(){
  

      this.chatCreado  = new Chat (0,this.userService.user.id_user,
      this.userService.usuarioSeleccionado.id_user,
      false, 
      this.userService.usuarioSeleccionado.photo,
      this.userService.usuarioSeleccionado.name,
      )


    this.chatService.postChat(this.chatCreado).subscribe((respuestaChat : RespuestaChat)=>{
      
      this.chatCreado.id_chat = respuestaChat.id_chat;
      this.chatService.chat = this.chatCreado;
      this.router.navigate(["conversacion-chat"]);
 // this.router.navigate(["conversacion-chat"], {state: {idchat: respuestaChat, photo1 : chatCreado.photo, name1 : chatCreado.name}})
    })
  }
  goOpiniones(id_user: number){
    
    this.router.navigate(["opiniones"])
  }


  verTienda(){
    this.userService.getInfoArtista(this.userService.usuarioSeleccionado.id_user)
    .subscribe((respuesta : Respuesta) => {
      this.userService.usuarioSeleccionado = respuesta.data_user[0]
      this.router.navigate(['tienda-externa']);
      console.log(respuesta.data_user);
    })
  }
}