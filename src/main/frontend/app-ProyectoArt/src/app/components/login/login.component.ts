import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Artista, DatabaseServiceService} from '../../services/database-service.service';
import {NgForOf} from '@angular/common';
import {UserLoginService} from '../../services/user-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  artistas: Artista[] = [];
  todosArtistas: Artista[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(
    protected databaseService: DatabaseServiceService,
    protected userService: UserLoginService,
    private fb: FormBuilder)
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{
    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.todosArtistas = data;
    })
  }


  //Metodo para comprobar si las credenciales son correctas y se consigue el Login
  submit(){
    let loginSuccesfull: boolean = false;

    if (this.loginForm.valid) {
      const newArtist: Artista = this.loginForm.value;


      this.artistas.forEach(a => {
        if ((a.username === newArtist.username) && (a.password === newArtist.password)){
          console.log('User logged succesfully');
        }
      })



    } else {
      console.error('Error creating Artist')
    }
  }
}
