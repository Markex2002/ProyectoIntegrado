import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Artista, DatabaseServiceService, Usuario} from '../../services/database-service.service';
import {CommonModule, NgForOf} from '@angular/common';
import {UserLoginService} from '../../services/user-login.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  usuarios: Usuario[] = [];
  todosUsuarios: Usuario[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(
    protected databaseService: DatabaseServiceService,
    protected userService: UserLoginService,
    private fb: FormBuilder,
    private router: Router,)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{
    this.databaseService.getAllArtistas().subscribe((data: Usuario[]) =>{
      this.usuarios = data;
      this.todosUsuarios = data;
    })
  }


  //Metodo para comprobar si las credenciales son correctas y si se consigue el Login
  submit(){
    let loginSuccesfull: boolean = false;
    this.aviso= '' ;

    if (this.loginForm.valid) {
      const newUser: Usuario = this.loginForm.value;

      this.usuarios.forEach(u => {
        if ((u.username === newUser.username) && (u.password === newUser.password)){
          console.log('User logged succesfully');
          loginSuccesfull = true;
        }
      })

      //Guardamos en LocalStorage si el Usuario se ha Logeado Correctamente
      this.userService.setBoolean('isLoggedIn', loginSuccesfull);
      const isLoggedIn = this.userService.getBoolean('isLoggedIn');
      console.log(isLoggedIn); // Output: true


      //Use a micro-task to ensure state update is reflected
      setTimeout(() => {
        if (isLoggedIn) {
          this.router.navigate(['/home']).then(() => {
            // Reload after navigation
            window.location.reload();
          });
        } else {
          this.aviso = "Username or contraseña Incorrecta";
        }
      }, 0);
    } else {
      this.aviso = "Por favor, inserte su username y contraseña";
    }
  }
}
