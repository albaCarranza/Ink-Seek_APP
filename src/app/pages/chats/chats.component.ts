import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat';
import { Conversacion } from 'src/app/models/conversacion';
import { Mensaje } from 'src/app/models/mensaje';
import { RespuestaChat } from 'src/app/models/respuesta-chat';
import { RespuestaConversacion } from 'src/app/models/respuesta-conversacion';
import { ChatsService } from 'src/app/shared/chats.service';
import { UserService } from 'src/app/shared/user.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
    // public chat : Mensaje
    public chats : Chat[]
    public mensaje : Mensaje[]
    public chat : Chat
    constructor(public chatService : ChatsService, public userService : UserService, public router : Router){
      this.chatService.getConversaciones(this.userService.user.id_user).subscribe((respuestaChat : RespuestaChat)=>{
        this.chats = respuestaChat.data_conversacion
        
      })
    }

    // goChats(){
    //   this.router.navigate(['/chats'])
    // }

    encontrado(id : HTMLInputElement){

      if(this.chats.filter(chat => chat.name == id.value).length > 0){
      this.chats = this.chats.filter(chat => chat.name == id.value)
      }
      else{
        this.chatService.getConversaciones(this.userService.user.id_user).subscribe((respuestaChat : RespuestaChat)=>{
          this.chats = respuestaChat.data_conversacion
          
        })
      }
    }

    // goMensajes(id_chat : number, photo : string,name : string){
    
    //   this.router.navigate(["conversacion-chat"], {state: {idchat: id_chat, photo1 : photo, name1 : name}})  
         
    // }
    
    goMensajes(conversacion : Chat){
      this.chatService.chat = conversacion;
      this.router.navigate(["conversacion-chat"]);
         
    }
deleteChat(chat : Chat){
    this.chatService.deleteChat(chat.id_chat).subscribe((respuestaChat : RespuestaChat)=>{
      this.chats = this.chats.filter(chat1 => chat1.id_chat !== chat.id_chat)
      
    })
  }
   
}
