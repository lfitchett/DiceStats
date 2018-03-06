import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as $ from "jquery";
$
import * as popper from "popper.js";
popper
import * as bootstrap from "bootstrap";
bootstrap

import 'bootstrap/dist/css/bootstrap.min.css';

if (environment.production) {
  enableProdMode();
}
 
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err)); 
 