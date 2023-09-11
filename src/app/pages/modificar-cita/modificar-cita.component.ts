import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaService } from 'src/app/shared/cita.service';
import { Cita } from 'src/app/models/cita';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.component.html',
  styleUrls: ['./modificar-cita.component.css']
})
export class ModificarCitaComponent implements OnInit {
  cita: Cita = {
    id_cita: 0,
    asunto: '',
    email: '',
    fecha: '',
    hora: '',
    name: '',
    last_name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const citaId = params.get('id');
      if (citaId) {
        this.obtenerCita(parseInt(citaId));
      } else {
        
      }
    });
  }

  obtenerCita(citaId: number): void {
    this.citaService.getCitaById(citaId).subscribe(
      (response: any) => {
        
        if (!response.error) {
          const citaData = response.data_cita;
          if (citaData) {
            const citaModificada: Cita = {
              id_cita: citaData.id_cita,
              asunto: citaData.asunto,
              email: citaData.email,
              fecha: citaData.fecha,
              hora: citaData.hora,
              name: citaData.name,
              last_name: citaData.last_name
            };
            
            this.cita = citaModificada;
          } else {
            
          }
        } else {
          
        }
      },
    );
  }
  
  guardarCambios(): void {


    const fechaAjustada = new Date(this.cita.fecha);
    fechaAjustada.setDate(fechaAjustada.getDate() + 1);
    this.cita.fecha = fechaAjustada.toISOString();

    this.citaService.updateCita(this.cita).subscribe(
      (response: any) => {
        
        if (!response.error) {
          
          this.router.navigate(['/calendario']);
        } else {
          
        }
      },
    );
  }

  eliminarCita(): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citaService.deleteCita(this.cita.id_cita).subscribe(
        (response: any) => {
          if (!response.error) {
            this.router.navigate(['/calendario']);
          } else {
          }
        },
      );
    }
  }
}
