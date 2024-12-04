import {Component, OnInit} from '@angular/core';
import {DatabaseServiceService, OfertaTrabajo} from '../../services/database-service.service';
import {CommonModule, NgFor} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-ofertas-page',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, RouterOutlet],
  templateUrl: './ofertas-page.component.html',
  styleUrl: './ofertas-page.component.scss'
})
export class OfertasPageComponent implements OnInit{

  ofertas: OfertaTrabajo[] = [];
  todosOfertas: OfertaTrabajo[] = [];
  filtrosSeleccionados: String[] = []
  aviso:string = "";

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{

    this.databaseService.getAllOfertas().subscribe((data: OfertaTrabajo[]) =>{
      this.ofertas = data;
      this.todosOfertas = data;
      console.log(this.ofertas);
    })
  }













}
