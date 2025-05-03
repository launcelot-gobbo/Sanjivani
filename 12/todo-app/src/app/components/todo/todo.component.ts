import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  tasks: string[] = [];
  newTask = '';
  editIndex: number | null = null;

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  editTask(i: number) {
    this.newTask = this.tasks[i];
    this.editIndex = i;
  }

  updateTask() {
    if (this.editIndex !== null && this.newTask.trim()) {
      this.tasks[this.editIndex] = this.newTask.trim();
      this.newTask = '';
      this.editIndex = null;
    }
  }

  cancelEdit() {
    this.newTask = '';
    this.editIndex = null;
  }
}
