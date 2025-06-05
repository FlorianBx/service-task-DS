import { Component, inject } from '@angular/core';
import { DataService, Task } from '../../services/data-service';

@Component({
  selector: 'app-child-one',
  imports: [],
  templateUrl: './child-one.html',
  styleUrl: './child-one.css'
})
export class ChildOne {
  dataService = inject(DataService);
  todos: Task[] = this.dataService.taskList;
}
