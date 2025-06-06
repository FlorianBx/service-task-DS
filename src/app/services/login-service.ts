import { Injectable } from '@angular/core';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: User = {email: '', password: ''}

  login(email: string, password: string, confirmPassword: string): string {
    if (email === 'test@test.com' && password === '123123123' && confirmPassword === password) {
      return `Welcome ${email.split('@')[0]} !`
    }
    return 'Oops bad address !';
  }
}
