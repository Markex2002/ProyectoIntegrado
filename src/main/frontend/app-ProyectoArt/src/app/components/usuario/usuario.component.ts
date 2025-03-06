import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginService} from '../../services/user-login.service';
import {Artista, DatabaseServiceService, Empresa, Usuario} from '../../services/database-service.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule
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

  isEditing: { [key: string]: boolean } = {}; //Esto sirve para controlar si estamos editando algun campo

  //Conseguimos las Url de la Api
  private artistasApiUrl = "http://localhost:8080/v1/api/usuarios/";
  private empresasApiUrl = "http://localhost:8080/v1/api/empresas/";


  constructor(
    protected userService: UserLoginService,
    protected databaseService: DatabaseServiceService,
    private http: HttpClient
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
  activarEdicion(campo: string) {
    this.isEditing[campo] = true;
  }


  //Guardamos el campo modificado
  guardarCampo(campo: string) {
    if (this.loggedInArtista) {
      this.loggedInArtista.nombre = campo;
      this.databaseService.updateArtista(this.loggedInArtista);
    }
  }
}
