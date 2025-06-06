import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginService = inject(LoginService);

  applyForm = new FormGroup({
    email: new FormControl('test@email.com'),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    confirmPassword: new FormControl('')
  })

  get password() {
    return this.applyForm.get('password')!;
  }


  submitForm() {
    if (this.applyForm.invalid) {
      throw new Error('Invalid form');
    }
    if (this.applyForm.value.email && this.applyForm.value.password && this.applyForm.value.confirmPassword) {
      const user = this.loginService.login(this.applyForm.value.email, this.applyForm.value.password, this.applyForm.value.confirmPassword)
      console.log(user);
    }
  }
}
