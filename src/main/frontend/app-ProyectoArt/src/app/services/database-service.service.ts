import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';






@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  private apiURLIdiomas = "http://localhost:8080/v1/api/idiomas";
  private apiURLImagen = "http://localhost:8080/v1/api/imagenes";
  private apiURLOferta = "http://localhost:8080/v1/api/ofertas";
  private apiURLArtista = "http://localhost:8080/v1/api/artistas";
  private apiURLEmpresa = "http://localhost:8080/v1/api/empresas";
  private apiURLAdministrador = "http://localhost:8080/v1/api/administradores";

  //IdArtistaParaLasPaginas
  idArtista : number = 0;

  setIdArtista(nuevoIdArtista:number){
    this.idArtista = nuevoIdArtista;
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient){};


  //IDIOMA
  getAllIdiomas(): Observable<Idioma[]>{
    return this.httpClient.get<Idioma[]>(this.apiURLIdiomas)
    .pipe(
      catchError(this.errorHandler)
    )
  }



  //ARTISTA
  getAllArtistas(): Observable<Artista[]>{
    return this.httpClient.get<Artista[]>(this.apiURLArtista)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  //EMPRESA
  getAllEmpresa(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(this.apiURLEmpresa)
      .pipe(
        catchError(this.errorHandler)
      )
  }



  //IMAGENES
  getAllImagenes(): Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(this.apiURLImagen)
      .pipe(
        catchError(this.errorHandler)
      )
  }





  //OFERTAS
  getAllOfertas(): Observable<OfertaTrabajo[]>{
    return this.httpClient.get<OfertaTrabajo[]>(this.apiURLOferta)
      .pipe(
        catchError(this.errorHandler)
      )
  }




















  //ERROR HANDLER
  errorHandler(error: any) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }
}




//INTERFACES EXPORTS
export interface Idioma {
  id: number,
  nombre: string,
  ultimaActualizacion: string,
  id_oferta: number
}

export interface Artista {
  id: number,
  username: string,
  password: string;
  email: string;
  nombre: string,
  yearsOfExperience: number,
  idiomasHablados: Idioma[],
  portfolio: Imagen[],
  id_oferta: number,
  ofertasTrabajo: OfertaTrabajo[],
  descripcionCorta: string,
  descipcionLarga: string
}

export interface Imagen {
  idImagen: number,
  url: string,
  nombre: string,
  artista: Artista,
}

export interface Empresa {
  id: number,
  username: string,
  password: string,
  email: string,
  nombreEmpresa: string,
  numTlf: number,
  nombreRepresentante: string,
  listadoOfertas: OfertaTrabajo[]
}

export interface OfertaTrabajo {
  id_oferta: number,
  salarioBrutoMin : number,
  salarioBrutoMax: number,
  avaiablePositions: number,
  duracionJornada: number,
}
