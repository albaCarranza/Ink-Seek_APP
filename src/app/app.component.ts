import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hideHeader: boolean = false;
  hideNavbar: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        this.hideHeader = url.includes('login') || url.includes('register') || url.includes('pre-register');
        this.hideNavbar = url.includes('login') || url.includes('register') || url.includes('pre-register');
      }
    });
  }

  title = 'INK-SEEK';
}