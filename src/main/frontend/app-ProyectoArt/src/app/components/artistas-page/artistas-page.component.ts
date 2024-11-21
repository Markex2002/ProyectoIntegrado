import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgForOf, SlicePipe} from "@angular/common";
import {Artista, DatabaseServiceService, Imagen} from '../../services/database-service.service';

@Component({
  selector: 'app-artistas-page',
  standalone: true,
    imports: [RouterLink, RouterOutlet, NgForOf, SlicePipe],
  templateUrl: './artistas-page.component.html',
  styleUrl: './artistas-page.component.scss'
})
export class ArtistasPageComponent implements OnInit {

  artistas: Artista[] = [];
  idArtistaSeleccionado! : number;
  imagenes: Imagen[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{

    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
    })
    this.databaseService.getAllImagenes().subscribe((data: Imagen[]) =>{
      this.imagenes = data;
    })
  }


  //Funcion para encontrar la Imagen destacada del Artista
  findFirstImageOfArtist(artista: Artista){
    let imgSrc = "";
    this.imagenes.forEach(imagen => {
      if (imagen.artista.id === artista.id){
        imgSrc = imagen.url;
      }
    })
    return imgSrc;
  }



  //Funcion para pasar el Id de un artista al componente Hijo
  seleccionarArtista(idArtista: number){
    this.idArtistaSeleccionado = idArtista;
  }








  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
