import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';






@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  private apiURL = "http://localhost:8080/v1/api/idiomas";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient){};


  //IDIOMA
  getAll(): Observable<Idioma[]>{
    return this.httpClient.get<Idioma[]>(this.apiURL)
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
