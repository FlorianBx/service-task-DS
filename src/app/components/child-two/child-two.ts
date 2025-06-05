import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService, Task } from '../../services/data-service';

@Component({
  selector: 'app-child-two',
  imports: [RouterOutlet],
  templateUrl: './child-two.html',
  styleUrl: './child-two.css'
})
export class ChildTwo {
  dataService = inject(DataService);
  todos: Task[] = this.dataService.taskList;

  ngOnInit() {
    this.todos.push(
      {id: this.todos.length + 1, task: 'task4 🚀'}
    );
    this.todos.push(
      {id: this.todos.length + 1, task: 'super test🚀'}
    );
  }

}
