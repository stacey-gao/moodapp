import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Navigation routes
  { path: 'homepage', component: Homepage, title: 'NeuroConnect' },

  
  {
    path: 'glucose',
    loadComponent: () => 
      loadRemoteModule('glucose', './Component').then(m => m.AppComponent)
  },
  {
    path: 'cholesterol',
    loadComponent: () => 
      loadRemoteModule('cholesterol', './Component').then(m => m.AppComponent)
  },
  {
    path: 'sleep',
    loadComponent: () => 
      loadRemoteModule('sleep', './Component').then(m => m.AppComponent)
  },
  {
    path: 'mood',
    loadComponent: () =>
      loadRemoteModule('mood', './WeeklyTrend')
        .then(m => m.WeeklyTrend),
  },
  {
    path: 'heart-rate',
    loadComponent: () => 
      loadRemoteModule('heartRate', './Component').then(m => m.AppComponent)
  }
];