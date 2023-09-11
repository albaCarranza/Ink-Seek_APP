import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Respuesta } from 'src/app/models/respuesta';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('volar', [
      state('inicial', style({
        transform: 'translateY(0)'
      })),
      state('final', style({
        transform: 'translateY(-85vh)'
      })),
      transition('inicial => final', animate('4s 0.5s')),
    ]),
    trigger('aparecer', [
      state('inicial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('inicial => final', animate('5s 1.5s')),
    ])
  ]
})
export class LoginComponent implements OnInit {
  public user: User;

  constructor(
    public userService: UserService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.user = new User();
  }

  onSubmit(form: NgForm) {
    this.userService.login(this.user).subscribe((res: Respuesta) => {
      if (res.mensaje === 'Los datos son correctos') {
        this.userService.logueado = true;
        this.userService.user = res.data_user[0];
        this.router.navigateByUrl('/home');

        if (res.data_user[0].is_Tatuador === 1) {
          this.userService.is_Tatuador = true;
        } 
        else {
          this.userService.is_Tatuador = false;
        }

        if (this.userService.is_Tatuador === true) {
          this.router.navigate(['/profile-tatuador-propia']);
        } 
        else {
          this.router.navigate(['/edit-profile-tatuador']);
        }
        } 
      else {
        
        this.userService.logueado = false;
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');
      }
    });
  }

  ngOnInit(): void {}
}
