import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Task {
  id: number;
  task: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpClient = inject(HttpClient);

  taskList: Task[] = [
    {id: 1, task: 'Test1'},
    {id: 2, task: 'Test2'},
    {id: 3, task: 'Test3'},
  ]

  getCat(): Observable<CatImage[]> {
    return this.httpClient.get<CatImage[]>('https://api.thecatapi.com/v1/images/search').pipe(
      retry(3),
      catchError((error) => {
        console.error('Error fetching cat images:', error);
        return of([]);
      })
    );  
  }
}
