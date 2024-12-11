import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  isUserLogged: boolean = false;
  userType: string = "usuario";

  constructor(private router: Router) {
    this.isUserLogged = this.getBoolean('isLoggedIn');
    this.userType = this.getString('userType');
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

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');

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


export interface Usuario {
  id?: number,
  username: string,
  password: string;
}
