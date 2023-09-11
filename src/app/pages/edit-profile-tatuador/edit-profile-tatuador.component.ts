import { Component } from '@angular/core';
import { Respuesta } from 'src/app/models/respuesta';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-edit-profile-tatuador',
  templateUrl: './edit-profile-tatuador.component.html',
  styleUrls: ['./edit-profile-tatuador.component.css']
})
export class EditProfileTatuadorComponent {
  public is_Tatuador: boolean;
  public usuario: User;
  public id_user: number;
  public selectedImage: string = '';

  constructor(public userService: UserService) {
    this.usuario = this.userService.user;
    this.is_Tatuador = this.userService.is_Tatuador;
    this.id_user = this.userService.user.id_user;
    console.log(this.usuario);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Validar el tamaño de la imagen antes de convertirla en Base64 (opcional)
      if (file.size <= 10 * 1024 * 1024) {
        // Crear un FileReader para leer la imagen seleccionada como base64
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // El resultado del FileReader será la imagen en formato base64
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Mostrar un mensaje de error al usuario
        alert('La imagen seleccionada es demasiado grande. Por favor, elija una imagen más pequeña.');
      }
    } else {
      this.selectedImage = '';
    }
  }

  guardarCambios() {
    this.usuario.photo = this.selectedImage || this.usuario.photo;
    console.log(this.usuario);
    this.userService.edit(this.usuario)
      .subscribe((resp: Respuesta) => {
        if (resp.mensaje === 'Los datos son correctos') {
          this.userService.user = resp.data_user[0];
        } else {
          // Manejar el error aquí si es necesario
        }
      });
  }
}
