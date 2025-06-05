import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  router = inject(Router);

  goToChildTwo() {
    this.router.navigate(['/child-2']);
  }

  ngOnInit() {
    setTimeout(() => {
      this.goToChildTwo();
    }, 2000);
  }


}
