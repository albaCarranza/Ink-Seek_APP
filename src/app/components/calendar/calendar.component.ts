import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/cita';
import { UserService } from 'src/app/shared/user.service';
import { CitaService } from 'src/app/shared/cita.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedDate: Date;
  is_Tatuador: boolean = true;
  citasAgendadas: Cita[] = [];
  viewDate: Date = new Date();
  calendarDays: any[];
  selectedDayCitas: Cita[];
  currentDate: Date = new Date();
  public usuario: User;
  public id_user: number;
  citas: Cita[] | undefined;
  currentDayCitas: Cita[];
  selectedDay: any;

  constructor(public userService: UserService, public citaService: CitaService, public router: Router) {
    this.is_Tatuador = userService.is_Tatuador;
    this.usuario = this.userService.user;
    this.id_user = this.userService.user.id_user;
  }

  getCurrentDate(): Date {
    return new Date();
  }

  getTextColor(day: any): string {
    if (this.isSameDate(day.date, this.currentDate)) {
      return 'aqua';
    } else {
      return day.textColor;
    }
  }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDate();

    if (this.is_Tatuador) {
      this.citaService.getCitas(this.id_user).subscribe(
        (response: any) => {
          console.log('Citas obtenidas:', response);
          if (!response.error) {
            this.citasAgendadas = response.data_citas || [];
          } else {
            console.log('Error al obtener las citas:', response.mensaje);
          }
          this.currentDate = this.getCurrentDate();
          this.generateCalendarDays();
          this.selectedDate = this.currentDate;
          this.generateDayCards(this.selectedDate);
          this.handleDayClick(this.selectedDate);
        },
        (error) => {
          console.log('Error al obtener las citas:', error);
        }
      );
    } else {
      this.userService.obtenerIdCliente(this.userService.user.email).subscribe(
        (citaEmail: number) => {
          console.log('Número de email de cita obtenido:', citaEmail);

          this.citaService.getCitasEmail(citaEmail).subscribe(
            (citasResponse: any) => {
              console.log('Citas obtenidas:', citasResponse);
              if (!citasResponse.error) {
                this.citasAgendadas = citasResponse.data_citas || [];
              } else {
                console.log('Error al obtener las citas:', citasResponse.mensaje);
              }
              this.currentDate = this.getCurrentDate();
              this.generateCalendarDays();
              this.selectedDate = this.currentDate;
              this.generateDayCards(this.selectedDate);
              this.handleDayClick(this.selectedDate);
            },
            (error) => {
              console.log('Error al obtener las citas:', error);
            }
          );
        },
        (error) => {
          console.log('Error al obtener el número de email de cita:', error);
        }
      );
    }
  }

  generateCalendarDays() {
    const startOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0);
    const endOfMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();
    const startDayOfWeek = startOfMonth.getDay();

    this.calendarDays = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      this.calendarDays.push({ date: null, textColor: 'white', hasCitas: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), i);
      const day: any = {
        date: currentDate,
        textColor: this.isWeekend(currentDate) ? 'var(--principal)' : 'white',
        hasCitas: this.hasCitas(currentDate)
      };

      this.calendarDays.push(day);
    }

    const lastDayOfWeek = endOfMonth.getDay();
    for (let i = lastDayOfWeek + 1; i <= 6; i++) {
      this.calendarDays.push({ date: null, textColor: 'white', hasCitas: false });
    }
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 6 || day === 0;
  }

  changeMonth(amount: number) {
    const currentMonth = this.viewDate.getMonth();
    const newMonth = currentMonth + amount;
    this.viewDate = new Date(this.viewDate.getFullYear(), newMonth);
    this.generateCalendarDays();
  }

  generateDayCards(date: Date) {
    this.selectedDayCitas = this.citasAgendadas.filter(cita => {
      const citaDate = new Date(cita.fecha);
      return this.isSameDate(citaDate, date);
    });
  }

  hasCitas(date: Date): boolean {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const dateString = this.formatDate(date);

      if (this.citasAgendadas && this.citasAgendadas.length > 0) {
        return this.citasAgendadas.some(cita => {
          const citaDate = new Date(cita.fecha);
          return citaDate instanceof Date && !isNaN(citaDate.getTime()) && this.formatDate(citaDate) === dateString;
        });
      }
    }

    return false;
  }

  handleDayClick(day: any) {
    this.selectedDay = day;
    if (day && day.date) {
      this.generateDayCards(day.date);
      this.selectedDayCitas = this.currentDayCitas.filter(cita => {
        const citaDate = new Date(cita.fecha);
        return this.isSameDate(citaDate, day.date);
      });
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
      return false;
    }

    const date1Formatted = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2Formatted = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return date1Formatted.getTime() === date2Formatted.getTime();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  goModificar(id_cita: number) {
    console.log(id_cita);
    this.router.navigate(['/modificar-cita', id_cita]);
  }

  goAdd() {
    this.router.navigate(['/add-cita']);
  }
}
