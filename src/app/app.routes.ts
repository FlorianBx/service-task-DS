import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ChildOne } from './components/child-one/child-one';
import { ChildTwo } from './components/child-two/child-two';
import { ChildThree } from './components/child-three/child-three';
import { ChildFour } from './components/child-four/child-four';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'child-1', component: ChildOne },
  { path: 'child-2', component: ChildTwo },
  { path: 'child-3', component: ChildThree },
  { path: 'last-child', component: ChildFour },
  { path: '404', component: NotFound },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];
