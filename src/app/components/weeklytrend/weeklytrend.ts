import { Component, } from '@angular/core';

@Component({
  selector: 'app-weeklytrend',
  imports: [],
  templateUrl: './weeklytrend.html',
  styleUrl: './weeklytrend.scss',
})

export class Weeklytrend {

 hoveredIndex: number | null = null;
  weekOffset = 0;

  get data() {
    return JSON.parse(localStorage.getItem('moodData') || '[]');
  }

  shiftDate(daysBack: number): Date {
    const d = new Date();
    d.setDate(d.getDate() - daysBack - (this.weekOffset * 7));
    return d;
  }

  getDate(offset: number): string {
    return this.shiftDate(offset).toISOString().split('T')[0];
  }

  getDayLabel(offset: number): string {
    return this.shiftDate(offset).toLocaleDateString('en-US', { weekday: 'short' });
  }

  getMood(offset: number): number {
    const entry = this.data.find((x: any) => x.date === this.getDate(offset));
    return entry ? entry.value : 0;
  }

  getY(moodValue: number): number {
    const chartHeight = 200;
    const maxMood = 10;
    return chartHeight - (moodValue * (chartHeight / maxMood));
  }

  get path(): string {
    const points = [
      [0, this.getY(this.getMood(6))],
      [60, this.getY(this.getMood(5))],
      [120, this.getY(this.getMood(4))],
      [180, this.getY(this.getMood(3))],
      [240, this.getY(this.getMood(2))],
      [300, this.getY(this.getMood(1))],
      [360, this.getY(this.getMood(0))]
    ];

    let d = `M ${points[0][0]} ${points[0][1]}`;

    //logic for curved line
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      
      const cp1x = x1 + (x2 - x1) / 2;
      const cp2x = x1 + (x2 - x1) / 2;
      d += ` C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
      }

      return d;
  }

  get areaPath(): string {
    return `${this.path} L 360 200 L 0 200 Z`;
  }

  get hasData(): boolean {
    return this.data.length > 0;
  }


  get weekLabel(): string {
    const start = this.shiftDate(6);
    const end = this.shiftDate(0);

    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }

  prevWeek() {
    this.weekOffset++;
  }

  nextWeek() {
    if (this.weekOffset > 0) this.weekOffset--;
  }

  setHover(i: number | null) {
    this.hoveredIndex = i;
  }
}

