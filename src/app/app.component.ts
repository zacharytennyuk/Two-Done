import { Component } from '@angular/core';
import { TimerComponent } from './timer/timer.component';  // Import the standalone TimerComponent
import { TimelapseComponent } from './timelapse/timelapse.component';  // Import the standalone TimelapseComponent
import { TaskListComponent } from './task-list/task-list.component';  // Import the standalone TaskListComponent

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // Add the standalone components to imports
  imports: [TimerComponent, TimelapseComponent, TaskListComponent],
})
export class AppComponent {
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
}
