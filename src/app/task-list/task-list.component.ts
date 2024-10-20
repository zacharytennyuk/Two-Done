import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and *ngFor
import { FormsModule } from '@angular/forms';    // Import FormsModule for ngModel
import confetti from 'canvas-confetti';  // Import confetti library

interface Task {
  id: number;
  name: string;
  isDone: boolean;
  isEditing: boolean;
}

@Component({
  standalone: true,
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, FormsModule]  // Import CommonModule and FormsModule
})
export class TaskListComponent {
  tasks: Task[] = [];
  doneTasks: Task[] = [];
  newTaskName: string = '';
  activeTab: 'todo' | 'done' = 'todo';  // Default to "To Do" tab
  nextId: number = 1;  // To give each task a unique ID

  // Add a new task to the To Do list
  addTask() {
    if (this.newTaskName.trim()) {
      this.tasks.push({
        id: this.nextId++,
        name: this.newTaskName.trim(),
        isDone: false,
        isEditing: false
      });
      this.newTaskName = '';  // Reset input field
    }
  }

  // Trigger inline editing on click
  startEditing(task: Task) {
    task.isEditing = true;
  }

  // Save the task name when finished editing
  saveTask(task: Task, event: any) {
    const newName = event.target.value.trim();
    if (newName) {
      task.name = newName;
    }
    task.isEditing = false;
  }

  // Mark a task as done, move it to the To Done list and trigger confetti
  completeTask(task: Task) {
    task.isDone = true;
    this.tasks = this.tasks.filter(t => t.id !== task.id);  // Remove from To Do list
    this.doneTasks.push(task);  // Add to Done list
  
    // Randomized confetti configuration
    confetti({
      particleCount: this.getRandomInt(50, 200),  // Random particle count between 50 and 200
      spread: this.getRandomInt(50, 120),         // Random spread between 50 and 120 degrees
      origin: { 
        x: Math.random(),    // Random horizontal start point (0 to 1)
        y: Math.random() * 0.6   // Random vertical start point (up to 0.6 for better visibility)
      },
      colors: this.getRandomColors(),             // Random colors
      angle: this.getRandomInt(55, 125),          // Random angle between 55 and 125 degrees
    });
  }
  
  // Helper method to get random integer within a range
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Helper method to get random colors
  getRandomColors(): string[] {
    const colorOptions = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ff9900'];
    const colorCount = this.getRandomInt(2, 5);  // Random number of colors between 2 and 5
    let colors: string[] = [];
    for (let i = 0; i < colorCount; i++) {
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors.push(randomColor);
    }
    return colors;
  }  

  // Delete a task from the To Do list
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Switch between To Do and To Done tabs
  switchTab(tab: 'todo' | 'done') {
    this.activeTab = tab;
  }
}
