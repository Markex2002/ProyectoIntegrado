import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DatabaseServiceService, Usuario} from '../../../services/database-service.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-usuarios-administracion',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf
  ],
  templateUrl: './usuarios-administracion.component.html',
  styleUrl: './usuarios-administracion.component.scss'
})
export class UsuariosAdministracionComponent implements OnInit{

  usuarios: Usuario[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros usuarios
  ngOnInit(): void{

    this.databaseService.getAllUsuarios().subscribe((data: Usuario[]) =>{
      this.usuarios = data;
    })
  }




  deleteUserInfo(userId: number | undefined) {
    this.databaseService.deleteUser(userId).subscribe(
      {next: (() => {}),
        error:  ((error:any) => {
          //console.log('Error eliminar producto', error);
          this.setAviso('Error al eliminar Usuario.')
        })});

    window.location.reload();
  }





  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
