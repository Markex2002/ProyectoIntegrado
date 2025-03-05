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
  loggedInUser: Artista | Empresa | Usuario | null = null;
  isArtist: boolean = false;
  isBusiness: boolean = false;

  constructor(
    protected userService: UserLoginService,
  ){}


  ngOnInit(): void{
    const loggedInUser = this.userService.getUser();
    console.log("Logged in user:", loggedInUser);

    if (this.userService.userType === 'artist') {
      this.isArtist = true;
      console.log("Artista")
    } else if (this.userService.userType === 'empresa') {
      this.isBusiness = true;
      console.log("Empresa")
    }
  }
}
