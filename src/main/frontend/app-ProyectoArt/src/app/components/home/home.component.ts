import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Artista, DatabaseServiceService, Imagen, Oferta_trabajo} from '../../services/database-service.service';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [RouterLink, RouterOutlet, NgForOf, CommonModule, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ofertas: Oferta_trabajo[] = [];
  todosOfertas: Oferta_trabajo[] = [];
  artistas: Artista[] = [];
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
    this.databaseService.getAllOfertas().subscribe((data: Oferta_trabajo[]) =>{
      this.ofertas = data;
      this.todosOfertas = data;
    })
  }


    //Funcion para encontrar la Imagen destacada del Artista
    findFirstImageOfArtist(artista: Artista){
      let imgSrc = "";
      this.imagenes.forEach(imagen => {
        if (imagen.artista?.id === artista.id){
          imgSrc = imagen.url;
        }
      })

      return imgSrc;
    }




  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
