import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/models/prenda';
import { Respuesta } from 'src/app/models/respuesta';
import { TiendaService } from 'src/app/shared/tienda.service';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-tienda-externa',
  templateUrl: './tienda-externa.component.html',
  styleUrls: ['./tienda-externa.component.css']
})
export class TiendaExternaComponent {
public prendas : Prenda[]


constructor(private router : Router,
            public tiendaService : TiendaService,
            public userService : UserService){

              this.tiendaService.getAllUserExterno(this.userService.usuarioSeleccionado.id_user).subscribe((respuesta : Respuesta)=>{
                this.prendas = respuesta.data_prenda;
                console.log(this.prendas)
                console.log(this.userService.usuarioSeleccionado.id_user)
})
}


find(id_prenda: HTMLInputElement) {

  if (this.prendas.filter(prenda => prenda.name.includes(id_prenda.value))) {
    this.prendas = this.prendas.filter(prenda => prenda.name.includes(id_prenda.value))
    console.log(this.prendas)
  }
  if(id_prenda.value == ""){
    this.tiendaService.getAll(this.userService.usuarioSeleccionado.id_user).subscribe((respuesta: Respuesta) => {
      this.prendas = respuesta.data_prenda;
      console.log(this.prendas)
    })
  }

}
}
