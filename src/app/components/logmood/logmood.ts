import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';    

@Component({
  selector: 'app-logmood',
  imports: [CommonModule, FormsModule], 
  templateUrl: './logmood.html',
  styleUrl: './logmood.scss',
})
export class Logmood implements OnInit {

  emojis = ['😭','😢','😟','😕','😐','🙂','😊','😄','😁','🤩'];

  selectedMood: number | null = null;
  selectedDate: string = '';
  note: string = ''

  moods: any[] = [];

  ngOnInit() {
    this.loadMoods();

    // default to today
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  selectMood(mood: number) {
    this.selectedMood = mood;
    this.saveMood(mood);
  }

saveMood(mood: number) {
  if (!this.selectedDate) return;

  const existing = JSON.parse(localStorage.getItem('moodData') || '[]');

  // remove entry for that date
  const filtered = existing.filter((x: any) => x.date !== this.selectedDate);

  const newEntry = {
    id: Date.now(),
    date: this.selectedDate,
    value: mood,
    note: this.note 
  };

  filtered.push(newEntry);

  localStorage.setItem('moodData', JSON.stringify(filtered));
  this.moods = filtered;

  this.note = '';
}

  loadMoods() {
    this.moods = JSON.parse(localStorage.getItem('moodData') || '[]');
  }

  deleteMood(id: number) {
    this.moods = this.moods.filter(m => m.id !== id);
    localStorage.setItem('moodData', JSON.stringify(this.moods));
  }

  clearAllMoods() {
    localStorage.removeItem('moodData');
    this.moods = [];
  }
  
}