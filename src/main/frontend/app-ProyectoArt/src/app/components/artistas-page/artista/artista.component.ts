import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Artista, DatabaseServiceService, Imagen} from '../../../services/database-service.service';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.scss'
})
export class ArtistaComponent {

  artistas: Artista[] = [];
  artista!: Artista;
  imagenes: Imagen[] = [];
  aviso:string = "";


  //Inicializamos los services
  constructor(private databaseService: DatabaseServiceService) {
  }

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{

    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.artista = this.artistas.find(a => a.id === this.databaseService.idArtista)!;
    })
    this.databaseService.getAllImagenes().subscribe((data: Imagen[]) =>{
      this.imagenes = data;
    })
  }


  //Funcion para encontrar la Imagen destacada del Artista
  findFirstImageOfArtist(){
    let imgSrc = "";
    this.imagenes.forEach(imagen => {

      // @ts-ignore
      if (imagen.artista.id === this.artista.id){
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
