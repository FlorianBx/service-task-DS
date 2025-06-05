import { Component, inject } from '@angular/core';
import { DataService, Task } from '../../services/data-service';

@Component({
  selector: 'app-child-three',
  imports: [],
  templateUrl: './child-three.html',
  styleUrl: './child-three.css'
})
export class ChildThree {
  dataService = inject(DataService);
  todos: Task[] = this.dataService.taskList;
}
