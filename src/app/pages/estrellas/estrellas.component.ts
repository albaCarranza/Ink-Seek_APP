import { Component } from '@angular/core';
import { Opinion } from 'src/app/models/opinion';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Respuesta } from 'src/app/models/respuesta';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent {
  

  opiniones:Opinion[];
  showInput: boolean = false;
  public user: User;
  opinion: Opinion;
  //****/
  rating: number = 0;
  opinionesEmisor: Opinion[];


  constructor(private router: Router, public userService: UserService) {
    this.user = this.userService.user;
    this.opiniones = this.user.opiniones || [] ; 
    
  }

  showResponseInput(rating: number) {
    this.showInput = true;
    this.rating = rating;
    }

  enviarOpinion(newOpinion : HTMLInputElement, rating: number) {
    // console.log('¿Se envía o no se envía, chacho?');
    let puntuacion = rating
   

    let nombre = this.userService.user.name;
    let emisor = this.userService.user.id_user;
    let receptor = this.userService.usuarioSeleccionado.id_user;
    let comment = newOpinion;
    
    let opinion : Opinion ={
      name : nombre,
      emisor : emisor,
      receptor : receptor,
      comentario : comment.value,
      puntuacion : puntuacion,

    }

    this.userService.enviarOpinion(opinion).subscribe((respuesta: Respuesta) => {
      this.opiniones.push(opinion); 
      // console.log(this.opiniones);
      // console.log(opinion);
      
      
      
    });
    this.showInput = true;
    this.rating = rating;
  }

  borrarOpinion(opinion : Opinion){    
    
    this.userService.borrarOpinion(opinion.id_opiniones).subscribe((respuesta: Respuesta) => {
    
      this.opiniones = this.opiniones.filter(opinion1 => opinion1.id_opiniones !== opinion.id_opiniones);
      
      
    });
  }

  //get opiniones del emisor
  // getOpinionesEmisor(emisor: number) {
  //   this.userService.getOpinionesEmisor(emisor).subscribe(
  //     (respuesta: Respuesta) => {
  //       console.log(respuesta.data_opinion);
  //       this.opinionesEmisor = respuesta.data_opinion || [];
  //       console.log(respuesta);
  //     },
  //     (error) => {
  //       console.error('Error fetching opinions:', error);
  //     }
  //   );
  // }

  
  // ngOnInit() {
  //   this.getOpinionesEmisor(this.user.id_user);
  // }
  

}