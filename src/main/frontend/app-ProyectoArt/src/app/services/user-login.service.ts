import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor() { }

  // Save a boolean value
  setUserLogged(key: string, value: boolean): void {
    localStorage.setItem(key, value.toString());
  }
  // Get a boolean value
  getUserLogged(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }
  // Remove an item from LocalStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  // Clear all LocalStorage
  clear(): void {
    localStorage.clear();
  }
}
