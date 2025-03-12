import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DatabaseServiceService {
  private apiBaseUrl = "http://localhost:8080/v1/api/";

  //IdArtistaParaLasPaginas
  idArtista : number | undefined = 0;
  setIdArtista(nuevoIdArtista: number | undefined){
    this.idArtista = nuevoIdArtista;
  }

  //IdOfertaParaLasPaginas
  idOferta : number | undefined = 0;
  setIdOferta(nuevoIdOferta: number | undefined){
    this.idOferta = nuevoIdOferta;
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private httpClient: HttpClient){};


  //IDIOMA
  getAllIdiomas(): Observable<Idioma[]>{
    return this.httpClient.get<Idioma[]>(this.apiBaseUrl + "idiomas/")
    .pipe(
      catchError(this.errorHandler)
    )
  }


  //////USUARIO//////
  getAllUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.apiBaseUrl + "usuarios/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  finduser(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.apiBaseUrl + "usuarios/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Funcion para crear un nuevo Usuario
  createUser(usuario: Usuario): Observable<Object> {
    return this.httpClient.post<Usuario>(this.apiBaseUrl + "usuarios/", JSON.stringify(usuario), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Funcion para eliminar un Usuario con su Id
  deleteUser(id: number | undefined): Observable<unknown> {
    return this.httpClient.delete<void>(
      this.apiBaseUrl + "usuarios/" + id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  //Funcion para Editar un Usuario
  updateUser(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(
      this.apiBaseUrl + "usuarios/" + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  //METODO PARA LOGUEARSE
  loginUser(user: { username: string; password: string }) {
    this.httpClient.post(this.apiBaseUrl + '/api/login', user).subscribe(response => {
      console.log('Login successful:', response);
    }, error => {
      console.error('Login failed:', error);
    });
  }


  /////ARTISTA/////
  getAllArtistas(): Observable<Artista[]>{
    return this.httpClient.get<Artista[]>(this.apiBaseUrl + "artistas/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createArtista(artista: Artista): Observable<Artista> {
    return this.httpClient.post<Artista>(
      this.apiBaseUrl + "artistas/",
      JSON.stringify(artista),
      this.httpOptions
    )
      .pipe(
        catchError(this.errorHandler)
      )
  }
  find(id: number): Observable<Artista> {
    return this.httpClient.get<Artista>(this.apiBaseUrl + "artistas/" + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateArtista(artista: Artista | null): Observable<Artista> {
    if (artista === null) {
      throw new Error("Artista no puede ser null");
    }
    return this.httpClient.put<Artista>((this.apiBaseUrl + "artistas/" + artista.id), artista, this.httpOptions
    ).pipe(
      catchError((error) => {
        console.error("Error updating Artista:", error);
        return throwError(() => new Error("Failed to update Artista"));
      })
    );
  }


  /////EMPRESA/////
  getAllEmpresa(): Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(this.apiBaseUrl + "empresas/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.apiBaseUrl + "empresas/", JSON.stringify(empresa), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateEmpresa(empresa: Empresa | null): Observable<Empresa> {
    if (empresa === null) {
      throw new Error("Empresa no puede ser null");
    }
    return this.httpClient.put<Empresa>((this.apiBaseUrl + "empresas/" + empresa.id), empresa, this.httpOptions
    ).pipe(
      catchError((error) => {
        console.error("Error updating Empresa:", error);
        return throwError(() => new Error("Failed to update Empresa"));
      })
    );
  }



  //ADMINISTRADOR
  getAllAdministrador(): Observable<Administrador[]>{
    return this.httpClient.get<Administrador[]>(this.apiBaseUrl + "administradores/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createAdministrador(administrador: Administrador): Observable<Administrador> {
    return this.httpClient.post<Administrador>(this.apiBaseUrl + "administradores/", JSON.stringify(administrador), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateAdministrador(administrador: Administrador | null): Observable<Administrador> {
    if (administrador=== null) {
      throw new Error("Administrador no puede ser null");
    }
    return this.httpClient.put<Administrador>((this.apiBaseUrl + "administradores/" + administrador.id), administrador, this.httpOptions
    ).pipe(
      catchError((error) => {
        console.error("Error updating Administrador:", error);
        return throwError(() => new Error("Failed to update Administrador"));
      })
    );
  }



  //IMAGENES
  getAllImagenes(): Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(this.apiBaseUrl + "imagenes/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createImagen(imagen: Imagen): Observable<Imagen> {
    return this.httpClient.post<Imagen>(this.apiBaseUrl + "imagenes/", JSON.stringify(imagen), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //Funcion para eliminar una Imagen por su Id
  deleteImage(id: number | undefined): Observable<unknown> {
    return this.httpClient.delete<void>(
      this.apiBaseUrl + "imagenes/" + id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  //UPLOAD IMAGENES
  uploadFile(formData: FormData): Observable<any>{
    return this.httpClient.post(this.apiBaseUrl + 'media/', formData)
  }






  //OFERTAS
  getAllOfertas(): Observable<Oferta_trabajo[]>{
    return this.httpClient.get<Oferta_trabajo[]>(this.apiBaseUrl + "ofertas/")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createOferta(ofertaTrabajo: Oferta_trabajo): Observable<Oferta_trabajo> {
    return this.httpClient.post<Oferta_trabajo>(
      this.apiBaseUrl + "ofertas/",
      JSON.stringify(ofertaTrabajo),
      this.httpOptions
    )
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteOferta(id: number | undefined): Observable<unknown> {
    return this.httpClient.delete<void>(
      this.apiBaseUrl + "ofertas/" + id, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
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
  id?: number,
  nombre: string,
  ultimaActualizacion: string,
  id_oferta: number
}

export interface Usuario {
  id?: number,
  username: string,
  password: string;
  email: string;
}

export interface Artista {
  id?: number,
  username: string,
  password: string;
  email: string;
  nombre: string,
  yearsOfExperience: number,
  idiomasHablados: Idioma[],
  portfolio: Imagen[],
  id_oferta: number,
  ofertasTrabajo: Oferta_trabajo[],
  descripcionCorta: string,
  descripcionLarga: string
  categorias: string[],
}

export interface Imagen {
  idImagen?: number,
  url: string,
  artista: Artista | null,
}

export interface Empresa {
  id?: number,
  username: string,
  password: string,
  email: string,
  nombreEmpresa: string,
  numTlf: number,
  nombreRepresentante: string,
  listadoOfertas: Oferta_trabajo[]
}

export interface Administrador {
  id?: number,
  username: string,
  password: string,
  email: string,
  nombre: string,
  privilegeLevel: number,
}

export interface Oferta_trabajo {
  id_oferta?: number,
  nombrePuesto: string,
  avaiablePositions: number,
  duracionJornada: number,
  empresa: Empresa,
  fechaPublicacion: Date,
  inscripcionHasta: Date,
  salarioBrutoMin : number,
  salarioBrutoMax: number,
  descripcionPuesto: string
}
