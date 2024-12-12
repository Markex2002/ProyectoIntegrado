import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule, NgForOf, SlicePipe} from "@angular/common";
import {Artista, DatabaseServiceService, Imagen} from '../../services/database-service.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-artistas-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NgForOf, SlicePipe, FormsModule],
  templateUrl: './artistas-page.component.html',
  styleUrl: './artistas-page.component.scss'
})
export class ArtistasPageComponent implements OnInit {

  artistas: Artista[] = [];
  todosArtistas: Artista[] = [];
  filtrosSeleccionados: String[] = []
  imagenes: Imagen[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{

    this.databaseService.getAllArtistas().subscribe((data: Artista[]) =>{
      this.artistas = data;
      this.todosArtistas = data;
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












  /////CATEGORIAS/////
  categories = [
    {
      name: 'Medio Artístico',
      items: [
        { label: 'Pintura', value: 'pintura', checked: false },
        { label: 'Arte Digital 2D', value: 'digital2d', checked: false },
        { label: 'Arte y Modelaje Digital 3D', value: 'digital3d', checked: false }
      ]
    },
    {
      name: 'Estilo Artistico',
      items: [
        { label: 'Realismo', value: 'realismo', checked: false },
        { label: 'Surrealismo', value: 'surrealismo', checked: false },
        { label: 'Anime', value: 'anime', checked: false },
        { label: 'Manga', value: 'manga', checked: false },
        { label: 'PixelArt', value: 'pixelart', checked: false }
      ]
    },
    {
      name: 'Tema',
      items: [
        { label: 'Naturaleza', value: 'naturaleza', checked: false },
        { label: 'Retratos', value: 'retratos', checked: false },
        { label: 'Fantasía', value: 'fantasia', checked: false }
      ]
    }
  ];

  selectedFilters: string[] = [];

  onCheckboxChange(value: string, checked: boolean) {
    if (checked) {
      this.selectedFilters.push(value);
    } else {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== value);
    }
  }

  filteredArtists: Artista[] = [];

  applyFilters() {
    this.filteredArtists = this.todosArtistas.filter(a =>
      a.categorias.some(category =>
        this.selectedFilters.includes(category))
    );

    this.artistas = this.filteredArtists;
    this.filtrosSeleccionados = this.selectedFilters.slice();
  }


  clearFilters() {
    this.artistas = this.todosArtistas;
    this.filteredArtists = this.todosArtistas.slice();
    this.filtrosSeleccionados = [];
  }



















  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
