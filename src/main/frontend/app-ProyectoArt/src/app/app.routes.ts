import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ArtistasPageComponent} from './components/artistas-page/artistas-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'artistas', component: ArtistasPageComponent},
];
