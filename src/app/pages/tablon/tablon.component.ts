import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/shared/events.service';
import { debounceTime } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tablon',
  templateUrl: './tablon.component.html',
  styleUrls: ['./tablon.component.css']
})
export class TablonComponent implements OnInit {
  public eventos: Evento[];
  public is_Tatuador: Boolean = true;
  search: string = "";
  id_user: number;

  constructor(private router: Router, private eventService:EventsService, private userService:UserService,private toastrService:ToastrService){
    this.id_user=this.userService.user.id_user
    this.is_Tatuador=this.userService.user.is_Tatuador
    
   }
   public deleteEvent(evento:Evento){
    this.eventService.deleteEvent(evento.id_evento).subscribe(()=>{
      this.eventos=this.eventos.filter((newEvento)=>newEvento.id_evento!==evento.id_evento);
      this.toastrService.show("Evento borrado",null, {toastClass:"toast1"})
      })
    }
    
   goAdd(){
    this.router.navigate(['/add-evento'])
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (response: any) => {
        this.eventos = response.eventos[0];
      },
    );
  }

  searchEvent() {
    this.eventService.searchEvent(this.search).pipe(debounceTime(300)).subscribe(
      (response: any) => {
        this.eventos = response.eventos[0];
      },
    );
  }
}
