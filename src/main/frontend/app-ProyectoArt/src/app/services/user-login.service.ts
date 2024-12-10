import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  isUserLogged: boolean = false;

  constructor() {
    this.isUserLogged = this.getBoolean('isLoggedIn');
    console.log('isUserLogged');
  }


  setBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getBoolean(key: string): boolean {
    return JSON.parse(localStorage.getItem(key) || 'false');
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
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
