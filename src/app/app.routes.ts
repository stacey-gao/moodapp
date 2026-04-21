import { Routes } from '@angular/router';
import { Logmoodpage } from './logmoodpage/logmoodpage';
import { Dashboard } from './dashboard/dashboard';
import { Seetrends } from './seetrends/seetrends';

export const routes: Routes = [
    // Default route: redirects empty URL to dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Navigation routes
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'logmoodpage', component: Logmoodpage, title: 'Log Your Mood' },
  { path: 'seetrends', component: Seetrends, title: 'Trends' }];
