import { Component } from '@angular/core';
import {Artista, DatabaseServiceService, OfertaTrabajo} from '../../../services/database-service.service';
import {NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserLoginService} from '../../../services/user-login.service';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    SlicePipe,
    NgClass
  ],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.scss'
})
export class OfertaComponent {

  ofertas: OfertaTrabajo[] = [];
  oferta!: OfertaTrabajo;
  ofertasRecomendadas: OfertaTrabajo[] = [];
  aviso:string = "";
  mensaje: string = '';
  mensajeClase: string = '';



  //Inicializamos los services
  constructor(protected databaseService: DatabaseServiceService, protected userService: UserLoginService,) {}



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



  aplicarOfertas(): void{
    if (this.userService.isUserLogged){
      this.mensaje = 'Oferta Aplicada';
      this.mensajeClase = 'mensaje-exito';
    } else {
      this.mensaje = 'Debe estar registrado para hacer esto';
      this.mensajeClase = 'mensaje-error';
    }
  }


  guardarOfertas(): void{
    if (this.userService.isUserLogged){
      this.mensaje = 'Oferta Guardada';
      this.mensajeClase = 'mensaje-exito';
    } else {
      this.mensaje = 'Debe estar registrado para hacer esto';
      this.mensajeClase = 'mensaje-error';
    }
  }












  /////AVISO ERROR/////
  setAviso(texto:string){
    this.aviso=texto;
    setTimeout(()=> this.aviso="",2000);
  }
}
