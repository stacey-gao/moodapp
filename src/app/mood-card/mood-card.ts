import { Component } from '@angular/core';
import { Weeklytrend } from '../components/weeklytrend/weeklytrend';

@Component({
  selector: 'app-mood-card',
  imports: [Weeklytrend],
  templateUrl: './mood-card.html',
  styleUrl: './mood-card.scss',
})
export class MoodCard {}
