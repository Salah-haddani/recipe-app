import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: () => console.log('Register Successfull'),
        error: (err) => alert(err.error.message),
      });
    }
  }
}
