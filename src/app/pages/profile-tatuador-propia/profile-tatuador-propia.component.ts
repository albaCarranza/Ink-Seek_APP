import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-profile-tatuador-propia',
  templateUrl: './profile-tatuador-propia.component.html',
  styleUrls: ['./profile-tatuador-propia.component.css']
})
export class ProfileTatuadorPropiaComponent implements OnInit {
  public user: any;
  public publicaciones: any[] = [];
  public puntuacionMedia: number = 0;
  public hasPuntuaciones = true;
  public starClasses: string[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
    this.userService.getTatuadorInfo().subscribe((respuesta: Respuesta) => {
      this.user.publicaciones = respuesta.data_foto;
      this.calcularPromedioValoracion();
      this.userService.getPuntuacionMedia(this.user.id_user).subscribe((respuesta: Respuesta) => {
        if (respuesta.puntuacion_media !== null) {
          this.puntuacionMedia = Number(respuesta.puntuacion_media);
          this.hasPuntuaciones = true;
          // Llamamos a la función para actualizar las clases de las estrellas
          this.actualizarClasesEstrellas();
        } else {
          this.hasPuntuaciones = false;
        }
      });
    });
  }

  calcularPromedioValoracion() {
    if (this.user.opiniones && this.user.opiniones.length > 0) {
      const sumaTotalValoraciones = this.user.opiniones.reduce(
        (suma: number, opinion: any) => suma + opinion.puntuacion,
        0
      );
      this.puntuacionMedia = sumaTotalValoraciones / this.user.opiniones.length;
    } else {
      this.puntuacionMedia = 0;
    }
  }

  actualizarClasesEstrellas() {
    const puntuacionEntera = Math.floor(this.puntuacionMedia);
    const decimal = this.puntuacionMedia - puntuacionEntera;
    const porcentajeRelleno = decimal * 100;
  
    this.starClasses = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= puntuacionEntera) {
        // Estrella completa
        this.starClasses.push('fas fa-star');
      } else if (i === puntuacionEntera + 1) {
        // Estrella con relleno según el porcentaje decimal
        const className = this.getStarClassNameByPercentage(porcentajeRelleno);
        this.starClasses.push(className);
      } else {
        // Estrella vacía
        this.starClasses.push('far fa-star');
      }
    }
  }
  
  getStarClassNameByPercentage(percentage: number): string {
    if (percentage >= 95) {
      return 'fas fa-star';
    } else if (percentage >= 85) {
      return 'fas fa-star star-85';
    } else if (percentage >= 75) {
      return 'fas fa-star star-75';
    } else if (percentage >= 65) {
      return 'fas fa-star star-65';
    } else if (percentage >= 55) {
      return 'fas fa-star star-55';
    } else if (percentage >= 45) {
      return 'fas fa-star star-45';
    } else if (percentage >= 35) {
      return 'fas fa-star star-35';
    } else if (percentage >= 25) {
      return 'fas fa-star star-25';
    } else if (percentage >= 15) {
      return 'fas fa-star star-15';
    } else {
      return 'far fa-star';
    }
  }

  deleteCardPerfil(publicacion: any) {
    this.userService.deleteCardPerfil(publicacion.id_photo).subscribe((respuesta: Respuesta) => {
      this.user.publicaciones = this.user.publicaciones.filter(
        (publicacion1: any) => publicacion1.id_photo !== publicacion.id_photo
      );
    });
  }

  goTienda(id_user: number) {
    this.userService.user.id_user = id_user;
    this.router.navigate(['tienda', id_user]);
  }
}
