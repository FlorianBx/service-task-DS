import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Layout } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'todobis';
}
