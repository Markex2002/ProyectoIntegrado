import { Component } from '@angular/core';
import {Artista, DatabaseServiceService, OfertaTrabajo} from '../../../services/database-service.service';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.scss'
})
export class OfertaComponent {

  ofertas: OfertaTrabajo[] = [];
  oferta!: OfertaTrabajo;
  aviso:string = "";


  //Inicializamos los services
  constructor(private databaseService: DatabaseServiceService) {}


  /////LOCALSTORAGE/////
  saveIdOferta(nuevoId: number | undefined): void {
    // Save the value to localStorage
    localStorage.setItem('valorIdOferta', String(nuevoId));
  }


  //Cargamos nuestras Ofertas
  ngOnInit(): void{
    //LOCALSTORAGE//
    //Si en el LocalStorage no hay nada guardado, guardaremos el nuevo Id Introducido,
    // en el caso de que si hubiera un valor, lo recuperaremos,
    // esto sirve en caso de que se refresque esta pagina
    if(this.databaseService.idOferta !== 0){
      this.saveIdOferta(this.databaseService.idOferta)
    } else {
      const valorIdOferta = localStorage.getItem('valorIdOferta');
      // @ts-ignore
      this.databaseService.idOferta = + valorIdOferta;
    }

    this.databaseService.getAllOfertas().subscribe((data: OfertaTrabajo[]) =>{
      this.ofertas = data;
      this.oferta = this.ofertas.find(a => a.id_oferta === this.databaseService.idOferta)!;
      console.log(this.oferta.nombrePuesto)
    })
  }




  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
