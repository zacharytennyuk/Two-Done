import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';  // Import the standalone TimerComponent
import { TimelapseComponent } from './timelapse/timelapse.component';  // Import the standalone TimelapseComponent
import { TaskListComponent } from './task-list/task-list.component';  // Import the standalone TaskListComponent

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Add the standalone components to imports
  imports: [TimerComponent, TimelapseComponent, TaskListComponent, CommonModule],
})
export class AppComponent {
  isVideoVisible: boolean = true; // Initially show the video

  toggleVideo() {
    this.isVideoVisible = !this.isVideoVisible; // Toggle video on/off
  }
  // Event handlers for the timer
  handleTimerStart() {
    console.log('Timer started.');
    // Handle recording start in TimelapseComponent
  }

  handleTimerStop() {
    console.log('Timer stopped.');
    // Handle recording stop in TimelapseComponent
  }

  handleTimerReset() {
    console.log('Timer reset.');
    // Handle recording reset in TimelapseComponent
  }

  openLoFiPlaylist() {
    window.open('https://www.youtube.com/watch?v=jfKfPfyJRdk', '_blank');
  }
}
