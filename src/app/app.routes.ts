import { provideHttpClient, withFetch } from '@angular/common/http';
import { Routes } from '@angular/router';

export const routes: Routes = [];

export const provideAppConfig = {
    providers: [provideHttpClient(withFetch())]
  };