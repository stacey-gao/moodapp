import { Component, signal } from '@angular/core';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  title = signal("Mood Monitor- Keep Track of Your Mental Health");

}

