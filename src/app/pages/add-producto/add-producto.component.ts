// add-producto.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Prenda } from 'src/app/models/prenda';
import { Respuesta } from 'src/app/models/respuesta';
import { TiendaService } from 'src/app/shared/tienda.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {

  public selectedImage: string | undefined;

  constructor(private router: Router, 
              public tiendaService : TiendaService,
              public userService : UserService,) {}
  
  goTienda(){
    this.router.navigate(['/tienda']);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result?.toString() || undefined;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImage = undefined;
    }
  }

  addProducto(inputName: HTMLInputElement) {
    if (!this.selectedImage || !inputName.value) {
      return;
    }
  
    const producto: Prenda = {
      id_user: this.userService.user.id_user,
      name: inputName.value,
      photo: this.selectedImage,
    };
  
    this.tiendaService.add(producto).subscribe(
      () => {
        this.tiendaService.getAll(this.userService.user.id_user).subscribe(
          (data: Respuesta) => { // Asegurar que 'data' es de tipo Respuesta
            this.tiendaService.prendas = data.data_prenda; // Acceder a 'data.data_prenda' directamente como 'data'
            this.router.navigate(['/tienda']);
          },
          (error) => {
            console.error("Error al obtener los productos:", error);
          }
        );
      },
      (error) => {
        console.error("Error al agregar el producto:", error);
      }
    );
  }
}
  
