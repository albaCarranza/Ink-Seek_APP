import { Component, OnInit } from '@angular/core';
import { Prenda } from 'src/app/models/prenda';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/shared/tienda.service';
import { Respuesta } from 'src/app/models/respuesta';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public prendas: Prenda[]=[];
  public is_Tatuador: Boolean = true;

  constructor(private router: Router,
    public tiendaService: TiendaService,
    public userService: UserService) {

    
    this.tiendaService.getAll(this.userService.user.id_user).subscribe((respuesta: Respuesta) => {
      this.prendas = respuesta.data_prenda;
      
    })

  }
  convertirBase64ToImageUrl(base64String: string): string {
    if (base64String) {
      return 'data:image/jpeg;base64,' + base64String;
    }
    return '';
  }

  goAdd() {
    this.router.navigate(['/add-producto'])
  }

  deleteProducto(prenda: Prenda) {
    this.tiendaService.delete(prenda.id_producto).subscribe(
      (respuesta: Respuesta) => {
        if (!respuesta.error) {
          // Eliminación exitosa, filtrar la lista de productos localmente para quitar el producto eliminado
          this.prendas = this.prendas.filter((p) => p.id_producto !== prenda.id_producto);
        } else {
          console.error("Error al eliminar el producto:", respuesta.mensaje);
        }
      },
      (error) => {
        console.error("Error en la solicitud al servidor:", error);
      }
    );
  }
  find(id_prenda: HTMLInputElement) {

    if (this.prendas.filter(prenda => prenda.name.includes(id_prenda.value))) {
      this.prendas = this.prendas.filter(prenda => prenda.name.includes(id_prenda.value))
      
    }
    if(id_prenda.value == ""){
      this.tiendaService.getAll(this.userService.user.id_user).subscribe((respuesta: Respuesta) => {
        this.prendas = respuesta.data_prenda;
        
      })
    }
 
  }

  ngOnInit(): void {

  }

}


