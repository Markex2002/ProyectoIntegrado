import { Component } from '@angular/core';
import {DatabaseServiceService, Idioma} from '../../../services/database-service.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
declare var bootstrap: any; //DECLARAMOS MANUALMENTE BOOSTRAP


@Component({
  selector: 'app-idiomas-administracion',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive,
    NgClass,
    DatePipe
  ],
  templateUrl: './idiomas-administracion.component.html',
  styleUrl: './idiomas-administracion.component.scss'
})
export class IdiomasAdministracionComponent {
  idiomas: Idioma[] = [];
  aviso:string = "";

  idiomaIdToDelete: number | undefined;

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros Idiomas
  ngOnInit(): void{
    this.databaseService.getAllIdiomas().subscribe((data: Idioma[]) =>{
      this.idiomas = data;
    })
  }

  // Open modal and store user ID
  openDeleteModal(idiomaId: number | undefined) {
    this.idiomaIdToDelete = idiomaId;
    let modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      let modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteIdiomaInfo() {
    this.databaseService.deleteIdioma(this.idiomaIdToDelete).subscribe(
      {next: (() => {}),
        error:  ((error:any) => {
          this.setAviso('Error al eliminar Idioma.')
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
