import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  task: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  taskList: Task[] = [
    {id: 1, task: 'Test1'},
    {id: 2, task: 'Test2'},
    {id: 3, task: 'Test3'},
  ]
}
