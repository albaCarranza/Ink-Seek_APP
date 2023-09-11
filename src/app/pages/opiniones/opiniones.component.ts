import { Component, OnInit } from '@angular/core';
import { Opinion } from 'src/app/models/opinion';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {
  user: User;
  opiniones: Opinion[] = [];
  showInput: boolean[] = [];
  showRespuesta: boolean[] = [];
  public id_opiniones: number;
  public emisor: number;
  public receptor: number;
  opinion: Opinion;
  public rating: number = 0;
  public puntuacion: number;
  respuestaTatuador: string = ''; 


  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getOpiniones(this.userService.user.id_user).subscribe(
      (respuesta: Respuesta) => {
        
        this.opiniones = respuesta.data_opinion || [];
       
      },
      (error) => {
        console.error('Error al obtener opiniones:', error);
      }
    );
  }

  enviarRespuesta(opinion: Opinion, respuesta: string) {
    opinion.respuestaTatuador = respuesta;
  
    this.userService.enviarRespuesta(opinion).subscribe(
      (respuesta: Respuesta) => {
        console.log('Respuesta enviada con éxito:', respuesta);
      },
      (error) => {
        console.error('Error al enviar respuesta:', error);
      }
    );
  }
  
  toggleShowInput(index: number) {
    this.showInput[index] = !this.showInput[index];
  }
}
