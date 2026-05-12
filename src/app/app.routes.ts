import { Routes } from '@angular/router';
import { Logmoodpage } from './logmoodpage/logmoodpage';
import { Dashboard } from './dashboard/dashboard';
import { Seetrends } from './seetrends/seetrends';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard),
    title: 'Dashboard'
  },
  {
    path: 'logmoodpage',
    loadComponent: () =>
      import('./logmoodpage/logmoodpage').then(m => m.Logmoodpage),
    title: 'Log Your Mood'
  },
  {
    path: 'seetrends',
    loadComponent: () =>
      import('./seetrends/seetrends').then(m => m.Seetrends),
    title: 'Trends'
  },
  { path: '**', redirectTo: '' }
];