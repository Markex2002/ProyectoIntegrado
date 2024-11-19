import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-artistas-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './artistas-page.component.html',
  styleUrl: './artistas-page.component.scss'
})
export class ArtistasPageComponent {}
