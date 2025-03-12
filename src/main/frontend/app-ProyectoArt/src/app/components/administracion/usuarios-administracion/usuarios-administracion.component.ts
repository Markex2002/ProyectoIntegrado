import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DatabaseServiceService, Usuario} from '../../../services/database-service.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
declare var bootstrap: any; //DECLARAMOS MANUALMENTE BOOSTRAP


@Component({
  selector: 'app-usuarios-administracion',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './usuarios-administracion.component.html',
  styleUrl: './usuarios-administracion.component.scss'
})
export class UsuariosAdministracionComponent implements OnInit{
  usuarios: Usuario[] = [];
  aviso:string = "";

  userIdToDelete: number | undefined;


  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros usuarios
  ngOnInit(): void{
    this.databaseService.getAllUsuarios().subscribe((data: Usuario[]) =>{
      this.usuarios = data;
    })
  }

  // Open modal and store user ID
  openDeleteModal(userId: number | undefined) {
    this.userIdToDelete = userId;
    let modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteUserInfo() {
    this.databaseService.deleteUser(this.userIdToDelete).subscribe(
      {next: (() => {}),
        error:  ((error:any) => {
          this.setAviso('Error al eliminar Usuario.')
          console.log(error)
        })});

    window.location.reload();
  }





  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
