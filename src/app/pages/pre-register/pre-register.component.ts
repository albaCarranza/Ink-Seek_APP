import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pre-register',
  templateUrl: './pre-register.component.html',
  styleUrls: ['./pre-register.component.css']
})
export class PreRegisterComponent {

  constructor(private router: Router) {}
  goRegister(is_Tatuador: boolean) {
    this.router.navigate(['/register'], { queryParams: { tatuador: is_Tatuador.toString() } });
  }
}
