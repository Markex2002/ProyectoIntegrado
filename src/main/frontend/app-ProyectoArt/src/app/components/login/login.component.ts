import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  Administrador,
  Artista,
  DatabaseServiceService,
  Empresa,
  Usuario
} from '../../services/database-service.service';
import {CommonModule, NgForOf} from '@angular/common';
import {UserLoginService} from '../../services/user-login.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
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

  //Cargamos nuestros usuarios
  ngOnInit(): void{
    this.databaseService.getAllUsuarios().subscribe((data: Usuario[]) =>{
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
          //UNA VEZ QUE HEMOS LOGEADO, COMPROBAMOS QUE TIPO DE USUARIO ES
          loginSuccesfull = true;
          this.checkUserType(u.id);
        }
      })

      //Guardamos en LocalStorage si el Usuario se ha Logeado Correctamente
      this.userService.setBoolean('isLoggedIn', loginSuccesfull);
      const isLoggedIn = this.userService.getBoolean('isLoggedIn');

      //Use a micro-task to ensure state update is reflected
      setTimeout(() => {
        if (isLoggedIn) {
          this.router.navigate(['/home']).then(() => {
            //Reiniciamos la pagina para que se reflejen los cambios
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



  //METODO PARA COMPROBAR QUE TIPO DE USUARIO SE HA LOGEADO
  checkUserType(idUser: number | undefined){
    let artistas: Artista[] = [];
    let administradores: Administrador[] = [];
    let empresas: Empresa[] = [];

    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      artistas = data;
      //COMPROBAMOS A CUAL PERTENECE EL USUARIO QUE SE HA LOGEADO
      artistas.forEach((a) => {
        if (a.id == idUser){
          this.userService.userType = "artista";
          this.userService.setString('userType', this.userService.userType);
        }
      });
    })
    this.databaseService.getAllAdministrador().subscribe((data: Administrador[]) =>{
      administradores = data;
      administradores.forEach((ad) => {
        if (ad.id == idUser){
          this.userService.userType = "administrador";
          this.userService.setString('userType', this.userService.userType);
        }
      });
    })
    this.databaseService.getAllEmpresa().subscribe((data: Empresa[]) =>{
      empresas = data;
      empresas.forEach((e) => {
        if (e.id == idUser){
          this.userService.userType = "empresa";
          this.userService.setString('userType', this.userService.userType);
        }
      });
    })

  }
}
