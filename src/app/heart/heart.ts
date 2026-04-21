import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HeartReading {
  day: string;
  bpm: number;
  exercise: string;
  duration: number;
  status: string;
}

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heart.html',
  styleUrl: './heart.css'
})
export class HeartComponent {
  bpmInput: number | null = null;
  selectedDay: string = 'Monday';
  exerciseInput: string = '';
  durationInput: number | null = null;

  readings: HeartReading[] = [
    { day: 'Monday', bpm: 72, exercise: 'Walking', duration: 20, status: 'Normal' },
    { day: 'Wednesday', bpm: 118, exercise: 'Running', duration: 30, status: 'High' },
    { day: 'Friday', bpm: 84, exercise: 'Cycling', duration: 25, status: 'Normal' }
  ];

  weeklyChart = [
    { day: 'Mon', bpm: 72 },
    { day: 'Tue', bpm: 0 },
    { day: 'Wed', bpm: 118 },
    { day: 'Thu', bpm: 0 },
    { day: 'Fri', bpm: 84 },
    { day: 'Sat', bpm: 0 },
    { day: 'Sun', bpm: 0 }
  ];

  addReading() {
    if (
      this.bpmInput === null ||
      this.bpmInput < 30 ||
      this.bpmInput > 220 ||
      this.exerciseInput.trim() === '' ||
      this.durationInput === null ||
      this.durationInput <= 0
    ) {
      alert('Please enter valid reading details.');
      return;
    }

    const status = this.getStatus(this.bpmInput);

    this.readings.unshift({
      day: this.selectedDay,
      bpm: this.bpmInput,
      exercise: this.exerciseInput,
      duration: this.durationInput,
      status
    });

    const shortDayMap: { [key: string]: string } = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun'
    };

    const chartDay = shortDayMap[this.selectedDay];
    const index = this.weeklyChart.findIndex(item => item.day === chartDay);

    if (index !== -1) {
      this.weeklyChart[index].bpm = this.bpmInput;
    }

    this.bpmInput = null;
    this.exerciseInput = '';
    this.durationInput = null;
    this.selectedDay = 'Monday';
  }

  getStatus(bpm: number): string {
    if (bpm < 60) return 'Low';
    if (bpm <= 100) return 'Normal';
    return 'High';
  }

  get latestReading(): HeartReading | null {
    return this.readings.length ? this.readings[0] : null;
  }

  get totalReadings(): number {
    return this.readings.length;
  }

  get averageBpm(): number {
    if (!this.readings.length) return 0;
    const total = this.readings.reduce((sum, reading) => sum + reading.bpm, 0);
    return Math.round(total / this.readings.length);
  }
}