import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logmood',
  imports: [],
  templateUrl: './logmood.html',
  styleUrl: './logmood.scss',
})
export class Logmood {
  emojis = ['😭','😢','😟','😕','😐','🙂','😊','😄','😁','🤩'];

  selectedMood: number | null = null;

  selectMood(mood: number) {
    this.selectedMood = mood;
    this.saveMood(mood);
  }

  saveMood(mood: number) {
    const existing = JSON.parse(localStorage.getItem('moodData') || '[]');
    const today = new Date().toISOString().split('T')[0];

    // replace today's entry if exists
    const filtered = existing.filter((x: any) => x.date !== today);

    filtered.push({
      date: today,
      value: mood
    });

    localStorage.setItem('moodData', JSON.stringify(filtered));
  }
}
