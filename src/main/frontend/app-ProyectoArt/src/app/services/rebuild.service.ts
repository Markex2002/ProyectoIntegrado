import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RebuildService {

  constructor() {}

  triggerRebuild() {
    fetch('/assets/media/watch-trigger.js?' + new Date().getTime())
      .then(response => response.text())
      .then(() => console.log('Triggered rebuild'));
  }
}
