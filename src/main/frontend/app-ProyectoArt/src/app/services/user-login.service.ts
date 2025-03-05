import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Artista, Empresa, Usuario} from './database-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  isUserLogged: boolean = false;
  userType: string = "usuario";
  currentUser: Artista | Empresa | Usuario | null = null;

  constructor(private router: Router) {
    this.isUserLogged = this.getBoolean('isLoggedIn');
    this.userType = this.getString('userType');
    this.currentUser = this.getUser();

    console.log(this.userType)
  }


  // Store user object
  setUser(user: Artista | Empresa | Usuario): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.setString('userType', user.hasOwnProperty('username') ? 'artist' : 'business');
  }

  // Retrieve user object
  getUser(): Artista | Empresa | Usuario | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  setBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getBoolean(key: string): boolean {
    return JSON.parse(localStorage.getItem(key) || 'false');
  }
  setString(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getString(key: string): string {
    return JSON.parse(<string>localStorage.getItem(key));
  }

  //Cuando hagamos click en Logout todos los datos que estaban guardados seran borrados
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('currentUser');

    this.router.navigate(['/home']).then(() => {
      //Reiniciamos la pagina para que se reflejen los cambios
      window.location.reload();
    });
  }





  setIdUsuarioLoged(key: string, value: number): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getIdUsuarioLoged(key: string): number {
    return JSON.parse(localStorage.getItem(key) || 'false');
  }
}
