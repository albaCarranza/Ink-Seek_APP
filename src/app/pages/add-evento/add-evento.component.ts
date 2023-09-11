import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/shared/events.service';
import { Evento } from 'src/app/models/evento';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.css']
})
export class AddEventoComponent {
  public id_user: number;
  public selectedImage: string = ''; // Cambiar el nombre de la variable a selectedImage

  title: string = '';
  place: string = '';
  fecha_inicio: Date;
  fecha_final: Date;

  constructor(
    public router: Router,
    public eventsService: EventsService,
    public userService: UserService
  ) {
    this.id_user = this.userService.user.id_user;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result?.toString() || ''; // Actualizar el valor de selectedImage
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = ''; // Actualizar el valor de selectedImage
    }
  }

  postEvent() {
    const evento = new Evento(
      this.id_user,
      this.selectedImage, // Usar el valor de selectedImage
      this.title,
      this.fecha_inicio,
      this.fecha_final,
      this.place,
      0
    );

    this.eventsService
      .postEvent(
        this.id_user,
        this.selectedImage, // Usar el valor de selectedImage
        evento.title,
        evento.fecha_inicio,
        evento.fecha_final,
        evento.place
      )
      .subscribe((data: any) => {
        if (data && data.error === false && data.eventos) {
          const newEvent = data.eventos[0];
          evento.id_evento = newEvent.id_evento;
          this.router.navigate(['/tablon']);
        } else {
          this.router.navigate(['/tablon']);
        }
      });
  }
}
