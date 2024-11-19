/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {appConfig} from './app/app.config';

bootstrapApplication(AppComponent, {
  providers:[
    provideHttpClient()
  ]})
  .catch((err) => console.error(err));


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
