import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ArtistasPageComponent} from './components/artistas-page/artistas-page.component';
import {OfertasPageComponent} from './components/ofertas-page/ofertas-page.component';
import {ArtistaComponent} from './components/artistas-page/artista/artista.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'artistas', component: ArtistasPageComponent},
  { path: 'artistas/:nombre', component: ArtistaComponent},
  { path: 'ofertas', component: OfertasPageComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }, //WildCard para el error 404
];
