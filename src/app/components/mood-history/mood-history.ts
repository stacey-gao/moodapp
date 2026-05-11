import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mood-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood-history.html',
  styleUrl: './mood-history.scss',
})
export class MoodHistory {

  @Input() moods: any[] = [];

  @Output() delete = new EventEmitter<number>();
  @Output() clearAll = new EventEmitter<void>();

  onDelete(id: number) {
    this.delete.emit(id);
  }

  onClear() {
    this.clearAll.emit();
  }
}