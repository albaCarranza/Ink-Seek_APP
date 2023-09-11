import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registro: FormGroup;
  public is_Tatuador: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.is_Tatuador = params['tatuador'] === 'true';
    });
  }

  public register() {
    if (this.registro.invalid) {
      
      return;
    }

    const nuevoNombre = this.registro.get('nombre').value;
    const nuevoApellido = this.registro.get('apellido').value;
    const nuevoEmail = this.registro.get('correo').value;
    const nuevaContraseña = this.registro.get('contraseña').value;

    const user = new User(
      null, 
      nuevoNombre,
      nuevoApellido,
      nuevoEmail,
      0,
      nuevaContraseña,
      this.is_Tatuador
    );

    this.userService.register(user).subscribe((data: string) => {
      if (data !== '-1') {
        user.id_user = Number(data);
        
      }if(this.is_Tatuador===true){
        this.router.navigate(['/login'])
      }
      else(this.router.navigate(['/login']))
    });
  }

  private checkPasswords(control: AbstractControl) {
    return control.parent?.value.contraseña === control.value ? null : { matchPassword: true };
  }

  private buildForm() {
    const minPassLength = 8;
    const maxPassLength = 16;

    this.registro = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(minPassLength), Validators.maxLength(maxPassLength)]],
      contraseña2: ['', [Validators.required, this.checkPasswords.bind(this)]]
    });
  }
}
