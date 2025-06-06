import { Component, inject } from '@angular/core';
import { DataService, Task, CatImage } from '../../services/data-service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-child-two',
  imports: [AsyncPipe],
  templateUrl: './child-two.html',
  styleUrl: './child-two.css'
})
export class ChildTwo {
  dataService = inject(DataService);
  todos: Task[] = this.dataService.taskList;
  myObservable$!: Observable<CatImage[]>;
  error: string | null = null;

  ngOnInit() {
    this.myObservable$ = this.dataService.getCat().pipe(
      catchError(error => {
        console.error('Error fetching cat images:', error);
        this.error = 'Unable to load cat images';
        return of([]);
      })
    );
  }
}
