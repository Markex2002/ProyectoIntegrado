import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Artista} from '../../../services/database-service.service';

@Component({
  selector: 'app-usuarios-administracion',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './usuarios-administracion.component.html',
  styleUrl: './usuarios-administracion.component.scss'
})
export class UsuariosAdministracionComponent {

  artistas: Artista[] = [];


}
