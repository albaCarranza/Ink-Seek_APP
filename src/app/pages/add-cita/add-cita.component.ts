import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../../shared/cita.service';
import { Cita } from '../../models/cita';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css']
})
export class AddCitaComponent {
  cita: Cita = new Cita();
  clienteId: number;
  public user: User;
  public idTatuador: number;

  constructor(private router: Router, private citaService: CitaService, private userService: UserService, private datePipe: DatePipe) {
    this.idTatuador = this.userService.user.id_user;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    this.cita.fecha = formattedDate;
  }
  
  formatFecha(fecha: string): string {
    const parts = fecha.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  
  agregarCita() {
    const emailCliente = this.cita.email;
    this.userService.obtenerIdCliente(emailCliente).subscribe(
      (idCliente: number) => {
        if (idCliente) {
          const formattedDate = this.datePipe.transform(this.cita.fecha, 'yyyy-MM-dd');
          this.cita.fecha = formattedDate;
          this.guardarCita(this.idTatuador, idCliente.toString());
        } else {
          
        }
      },

    );
  }
  
  

  guardarCita(idTatuador: number, idCliente: string) {
    this.cita.id_user = idTatuador;
    this.cita.email = idCliente;
    this.citaService.addCita(this.cita).subscribe(
      response => {
        
        this.router.navigate(['/calendario']);
      },
  
    );
  }
}
