import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Artista, DatabaseServiceService, Imagen} from '../../../services/database-service.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
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
  constructor(private databaseService: DatabaseServiceService) {}

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
      console.log(this.artista.descripcionLarga)

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
