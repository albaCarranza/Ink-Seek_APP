import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public is_Tatuador: boolean;
  
  activeLink: string = '';

  constructor(private router: Router, public userService:UserService) {
    this.is_Tatuador = userService.is_Tatuador;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.urlAfterRedirects;
      }
    });
  }

  isActiveLink(link: string): boolean {
    return this.activeLink.includes(link);
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}
