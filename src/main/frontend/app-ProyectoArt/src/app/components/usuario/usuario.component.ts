import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginService} from '../../services/user-login.service';
import {Artista, DatabaseServiceService, Empresa, Usuario} from '../../services/database-service.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})

export class UsuarioComponent implements OnInit{
  loggedInUser: Usuario | null = null;
  loggedInArtista: Artista | null = null;
  loggedInEmpresa: Empresa | null = null;

  isArtista: boolean = false;
  isEmpresa: boolean = false;

  constructor(
    protected userService: UserLoginService,
  ){}


  ngOnInit(): void{
    if (this.userService.userType == 'artista'){
      this.isArtista = true;
      this.loggedInArtista = this.userService.getArtista();
      console.log("Hola aqui un artista");
    } else if (this.userService.userType == 'empresa'){
      this.isEmpresa = true;
      this.loggedInEmpresa = this.userService.getEmpresa();
      console.log("Hola aqui un empresa");
    }
  }
}
