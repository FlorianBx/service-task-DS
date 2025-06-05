import { Component } from '@angular/core';
import { ChildOne } from './components/child-one/child-one';
import { ChildTwo } from './components/child-two/child-two';
import { ChildThree } from './components/child-three/child-three';

@Component({
  selector: 'app-root',
  imports: [ChildOne, ChildTwo, ChildThree],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'todobis';
}
