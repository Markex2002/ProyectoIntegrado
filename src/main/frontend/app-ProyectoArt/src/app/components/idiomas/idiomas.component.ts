import { Component, OnInit } from '@angular/core';
import {Idioma, DatabaseServiceService} from '../../services/database-service.service';
import {CommonModule, NgFor} from '@angular/common';

@Component({
  selector: 'app-idiomas',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './idiomas.component.html',
  styleUrl: './idiomas.component.scss'
})
export class IdiomasComponent implements OnInit{

  idiomas: Idioma[] = [];
  aviso:string = "";

  //Inicializamos los services
  constructor(private databaseService: DatabaseServiceService) {}


  ngOnInit(): void{
    this.databaseService.getAllIdiomas().subscribe((data: Idioma[]) =>{
      this.idiomas = data;
      console.log(this.idiomas)
    })
  }





  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
