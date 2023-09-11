import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public is_Tatuador: Boolean;
  public mostrarContenido: boolean = false;
  public user: User;

  constructor(private router: Router, public userService: UserService) {
    this.is_Tatuador = this.userService.is_Tatuador
    this.user = this.userService.user
    
  }

  public toggleHamburguesa() {
    this.mostrarContenido = !this.mostrarContenido;

  }
  
  public goHome() {
    this.router.navigate(['/home']);
  }

  public goPerfil() {
    if (this.is_Tatuador == true){
      this.router.navigate(['/profile-tatuador-propia']);
    }else{
      this.router.navigate(['/edit-profile-tatuador']);
    }
    
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const menu = document.getElementById('hamburguesa');
    if (!(target instanceof Node) || !menu.contains(target)) {
      menu.classList.remove('activo');
    }
  }
}
