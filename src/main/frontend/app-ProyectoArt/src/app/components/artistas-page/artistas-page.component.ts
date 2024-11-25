import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CommonModule, NgForOf, SlicePipe} from "@angular/common";
import {Artista, DatabaseServiceService, Imagen} from '../../services/database-service.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-artistas-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgForOf, SlicePipe, FormsModule],
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


  filtrarArtistas(categoriasSeleccionadas: string){
    let listaFiltrada: Artista[];

    this.artistas.forEach(a => {
      if (a.categorias.includes(categoriasSeleccionadas)){
        listaFiltrada.push(a)
      }
    })

    // @ts-ignore
    this.artistas = listaFiltrada;
  }











  /////CATEGORIAS/////
  categories = [
    {
      name: 'Categoria 1',
      items: [
        { label: 'First checkbox', value: 'categoria1', checked: false },
        { label: 'Second checkbox', value: 'categoria2', checked: false },
        { label: 'Third checkbox', value: 'categoria3', checked: false }
      ]
    },
    {
      name: 'Categoria 2',
      items: [
        { label: 'First checkbox', value: 'first2', checked: false },
        { label: 'Second checkbox', value: 'second2', checked: false },
        { label: 'Third checkbox', value: 'third2', checked: false },
        { label: 'Forth checkbox', value: 'forth2', checked: false },
        { label: 'Fiveth checkbox', value: 'fifth2', checked: false }
      ]
    },
    {
      name: 'Categoria 3',
      items: [
        { label: 'First checkbox', value: 'first3', checked: false },
        { label: 'Second checkbox', value: 'second3', checked: false }
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
