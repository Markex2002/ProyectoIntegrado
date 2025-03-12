import {Component, OnInit} from '@angular/core';
import {DatabaseServiceService, Oferta_trabajo} from '../../services/database-service.service';
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

  ofertas: Oferta_trabajo[] = [];
  todosOfertas: Oferta_trabajo[] = [];
  filtrosSeleccionados: String[] = []
  aviso:string = "";

  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService) {}

  //Cargamos nuestros artistas y su base de datos de Imagenes
  ngOnInit(): void{

    this.databaseService.getAllOfertas().subscribe((data: Oferta_trabajo[]) =>{
      this.ofertas = data;
      this.todosOfertas = data;
    })
  }













}
