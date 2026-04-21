import { Component, signal } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { Dashboard } from '../../dashboard/dashboard';
import { Logmoodpage } from '../../logmoodpage/logmoodpage';
import { Seetrends } from '../../seetrends/seetrends';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  title = signal("Mood Monitor- Keep Track of Your Mental Health");

}

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'logmoodpage', component: Logmoodpage },
  { path: 'seetrends', component: Seetrends },
];

