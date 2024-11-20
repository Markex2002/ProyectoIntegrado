import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ArtistasPageComponent} from './components/artistas-page/artistas-page.component';
import {OfertasPageComponent} from './components/ofertas-page/ofertas-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'artistas', component: ArtistasPageComponent},
  { path: 'ofertas', component: OfertasPageComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }, //WildCard para el error 404
];
