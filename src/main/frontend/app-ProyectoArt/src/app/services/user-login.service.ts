import { Injectable } from '@angular/core';
import {Idioma, Imagen, OfertaTrabajo} from './database-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  constructor() { }


  setBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getBoolean(key: string): boolean {
    return JSON.parse(localStorage.getItem(key) || 'false');
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
