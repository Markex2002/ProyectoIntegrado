import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Artista, DatabaseServiceService, Imagen} from '../../../services/database-service.service';
import {NgFor, NgIf, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    SlicePipe
  ],
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.scss'
})
export class ArtistaComponent {

  artistas: Artista[] = [];
  artistasRecomendados: Artista[] = [];
  artista!: Artista;
  imagenes: Imagen[] = [];
  imagenesArtista: Imagen[] = [];
  aviso:string = "";


  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{
    //LOCALSTORAGE//
    //Si en el LocalStorage no hay nada guardado, guardaremos el nuevo Id Introducido,
    // en el caso de que si hubiera un valor, lo recuperaremos,
    // esto sirve en caso de que se refresque esta pagina
    if(this.databaseService.idArtista !== 0){
      this.saveIdArtista(this.databaseService.idArtista)
    } else {
      const valorIdArtista = localStorage.getItem('valorIdArtista');
      // @ts-ignore
      this.databaseService.idArtista = + valorIdArtista;
    }

    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.artista = this.artistas.find(a => a.id === this.databaseService.idArtista)!;
      this.seleccionarArtistasRecomendados();
      console.log(this.artistasRecomendados)

    })
    this.databaseService.getAllImagenes().subscribe((data: Imagen[]) =>{
      this.imagenes = data;
      this.imagenes.forEach(imagen => {

        // @ts-ignore
        if (imagen.artista.id === this.artista.id){
          this.imagenesArtista.push(imagen)
        }
      })
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

  seleccionarArtistasRecomendados(): void {
    // Randomly select two different artists
    const selectedArtists: Artista[] = [];
    console.log("hola")
    while (selectedArtists.length < 2) {
      const randomIndex = Math.floor(Math.random() * this.artistas.length);
      const selectedArtist = this.artistas[randomIndex];

      // Avoid duplicates
      if (!selectedArtists.includes(selectedArtist) && (selectedArtist.id !== this.artista.id)) {
        selectedArtists.push(selectedArtist);
      }
    }

    this.artistasRecomendados = selectedArtists;
  }




  /////LOCALSTORAGE/////
  saveIdArtista(nuevoId: number | undefined): void {
    // Save the value to localStorage
    localStorage.setItem('valorIdArtista', String(nuevoId));
  }

  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
