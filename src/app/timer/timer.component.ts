import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  minutes: number = 25;
  seconds: number = 0;
  isRunning: boolean = false;
  timerInterval: any;

  // Define the custom events to emit start, stop, and reset actions
  @Output() start = new EventEmitter<void>();
  @Output() stop = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;

      // Emit start event when timer starts
      this.start.emit();

      this.timerInterval = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else if (this.minutes > 0) {
          this.minutes--;
          this.seconds = 59;
        } else {
          this.stopTimer();  // Timer finished
        }
      }, 1000);
    }
  }

  stopTimer() {
    this.isRunning = false;
    clearInterval(this.timerInterval);

    // Emit stop event when timer stops
    this.stop.emit();
  }

  resetTimer() {
    this.stopTimer();
    this.minutes = 25;
    this.seconds = 0;

    // Emit reset event when timer is reset
    this.reset.emit();
  }

  // Toggle start and pause functionality
  toggleStartPause() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  getDisplayTime(): string {
    const min = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    const sec = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    return `${min}:${sec}`;
  }
}
