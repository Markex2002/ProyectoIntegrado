import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Artista, DatabaseServiceService} from '../../services/database-service.service';
import {UserLoginService} from '../../services/user-login.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  artistForm: FormGroup;
  artistas: Artista[] = [];
  todosArtistas: Artista[] = [];
  aviso:string = "";


  //Inicializamos los services
  constructor(
    protected databaseService: DatabaseServiceService,
    protected userService: UserLoginService,
    private fb: FormBuilder,
    private router: Router,){

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/;


    this.artistForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(emailRegex)]], // Email validation
      },
      { validator: this.matchPasswords('password', 'confirmPassword') } // Add custom validator at the form group level
    );
  }

  // Custom validator function
  private matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[passwordKey];
      const confirmPassword = formGroup.controls[confirmPasswordKey];

      // Check if passwords match
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({passwordMismatch: true}); // Add error
      } else {
        confirmPassword.setErrors(null); // Clear error
      }
    };
  }


  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{
    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.todosArtistas = data;
    })
  }



  submit(){
    this.aviso= '' ;

    if (this.artistForm.valid) {
      const newArtist: Artista = this.artistForm.value;

      this.databaseService.create(newArtist).subscribe(res => {
        console.log('Artista creada correctamente! + res');
        this.artistForm.reset();
      })

      //Guardamos en LocalStorage el Inicio de Sesion
      this.userService.setBoolean('isLoggedIn', true);
      //Volvemos a Inicio
      this.router.navigate(['/home']);

    } else {
      //En caso de que falle la validacion
      if (this.artistForm.hasError('passwordMismatch')) {
        this.aviso = 'Las contraseñas no coinciden.';
      } else if (this.artistForm.get('email')?.hasError('pattern')) {
        this.aviso = 'Por favor, introduzca un correo electrónico válido.';
      } else if (this.artistForm.get('password') !== this.artistForm.get('confirmPassword')) {
        this.aviso = 'Las contraseñas no coinciden.';
      } else {
        this.aviso = "Por favor inserte sus datos en todos los campos";
      }
      return;
    }
}






  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
