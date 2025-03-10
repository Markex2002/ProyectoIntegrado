import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginService} from '../../services/user-login.service';
import {Artista, DatabaseServiceService, Empresa} from '../../services/database-service.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent implements OnInit{
  //Atributos que nos sirven para almacenar los datos del usuario Logeado
  loggedInArtista: Artista | null = null;
  loggedInEmpresa: Empresa | null = null;
  isArtista: boolean = false;
  isEmpresa: boolean = false;

  isEditing: boolean = false;


  constructor(
    protected userService: UserLoginService,
    protected databaseService: DatabaseServiceService,
  ){}



  ngOnInit(): void{
    //Comprobamos si el usuario que ha iniciado sesion es un Artista o una Empresa
    if (this.userService.userType == 'artista'){
      this.isArtista = true;
      this.loggedInArtista = this.userService.getArtista();
    } else if (this.userService.userType == 'empresa'){
      this.isEmpresa = true;
      this.loggedInEmpresa = this.userService.getEmpresa();
    }
  }


  //Activamos el modo edición
  activarEdicion() {
    this.isEditing = true;
  }


  nombre: string = '';
  //Guardamos el campo modificado
  guardarCampo() {
    if (this.loggedInArtista){
      this.loggedInArtista.nombre = this.nombre;

      this.databaseService.updateArtista(this.loggedInArtista).subscribe(res => {
        console.log('Artista Actualizado actualizada satisfactoriamente!');
      })
    }

    this.userService.setUser(this.loggedInArtista);
    window.location.reload();
  }


}
