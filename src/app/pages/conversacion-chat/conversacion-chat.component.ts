import { Component, ElementRef,ViewChildren, QueryList ,AfterViewInit  } from '@angular/core';
import { User } from 'src/app/models/user'
import { Tatuador } from 'src/app/models/tatuador';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/models/mensaje';
import { UserService } from 'src/app/shared/user.service';
import { ChatsService } from 'src/app/shared/chats.service';
import { RespuestaConversacion } from 'src/app/models/respuesta-conversacion';
import { Chat } from 'src/app/models/chat';
import { Respuesta } from 'src/app/models/respuesta';


@Component({
  selector: 'app-conversacion-chat',
  templateUrl: './conversacion-chat.component.html',
  styleUrls: ['./conversacion-chat.component.css']
})
export class ConversacionChatComponent implements AfterViewInit {
  public nuevoMensaje: Mensaje;
  public tatuador: Tatuador;
  public user: User;
  public mensajes: Mensaje[];
  public id_chat: number;
  public photo: string;
  public name: string;
  public usuarioSeleccionado : User
  @ViewChildren("mensaje") mensajeFunciona: QueryList<ElementRef>;



  constructor(private router: Router,
    public userService: UserService,
    public chatService: ChatsService,
  ) {

    this.chatService.getMensaje(this.chatService.chat.id_chat).subscribe((respuestaMensaje: RespuestaConversacion) => {
      this.mensajes = respuestaMensaje.data_mensaje
      console.log(this.chatService.chat)
      console.log(this.chatService.chat.id_chat)
      console.log(respuestaMensaje)

    })

  }



  scrollToBottom() {
    setTimeout(() => {
      const mensajesArray = this.mensajeFunciona.toArray();
      if (mensajesArray.length > 0) {
        const container = mensajesArray[mensajesArray.length - 1].nativeElement;
        container.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  enviarMensaje(mensajeBody: HTMLInputElement) {

    let mensajeEnviado = mensajeBody
    let mensaje = new Mensaje(0,
      this.chatService.chat.id_chat,
      this.userService.user.id_user,
      mensajeEnviado.value
    )
    this.chatService.postMensaje(mensaje).subscribe((respuestaMensaje: RespuestaConversacion) => {
      this.mensajes.push(mensaje)
      mensajeEnviado.value = '';
      this.scrollToBottom()
    })
  
   
  }
  goChats() {
    this.router.navigate(['/chats'])
  }
  verPerfil(){
    this.userService.getInfoArtista(this.chatService.chat.id_user2)
    .subscribe((respuesta : Respuesta) => {
      this.userService.usuarioSeleccionado = respuesta.data_user[0]
      this.router.navigate(['/profile-tatuador-externa']);
      
    })
  }
}
