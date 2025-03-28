import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ArtistasPageComponent} from './components/artistas-page/artistas-page.component';
import {OfertasPageComponent} from './components/ofertas-page/ofertas-page.component';
import {ArtistaComponent} from './components/artistas-page/artista/artista.component';
import {SignupComponent} from './components/signup/signup.component';
import {LoginComponent} from './components/login/login.component';
import {OfertaComponent} from './components/ofertas-page/oferta/oferta.component';
import {AdministracionComponent} from './components/administracion/administracion.component';
import {UsuariosAdministracionComponent} from './components/administracion/usuarios-administracion/usuarios-administracion.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {
  EditarUsuarioComponent
} from './components/administracion/usuarios-administracion/editar-usuario/editar-usuario.component';
import {CrearOfertaComponent} from './components/usuario/crear-oferta/crear-oferta.component';
import {
  IdiomasAdministracionComponent
} from './components/administracion/idiomas-administracion/idiomas-administracion.component';
import {
  EditarIdiomaComponent
} from './components/administracion/idiomas-administracion/editar-idioma/editar-idioma.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'home/artistas/:nombre', component: ArtistaComponent},
  { path: 'home/ofertas/:nombrePuesto', component: OfertaComponent},

  { path: 'signUp', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  {path: 'usuario', component: UsuarioComponent},
  {path: 'usuario/crearOferta', component: CrearOfertaComponent},


  { path: 'artistas', component: ArtistasPageComponent},
  { path: 'artistas/:nombre', component: ArtistaComponent},

  { path: 'ofertas', component: OfertasPageComponent},
  { path: 'ofertas/:nombrePuesto', component: OfertaComponent},

  { path: 'administracion', component: AdministracionComponent},

  { path: 'usuariosAdministracion', component: UsuariosAdministracionComponent},
  { path: 'editar-usuario/:id', component: EditarUsuarioComponent},

  { path: 'idiomasAdministracion', component: IdiomasAdministracionComponent},
  { path: 'editar-idioma/:id', component: EditarIdiomaComponent},





  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }, //WildCard para el error 404
];
