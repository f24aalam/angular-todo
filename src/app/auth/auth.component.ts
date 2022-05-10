import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loading: boolean = false;
  errorMessage: String | undefined;
  successMessage: String | undefined;
  isLoggedIn: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.errorMessage = undefined;
    this.isLoggedIn = false;
  }

  login() {
    this.errorMessage = undefined;
    this.isLoggedIn = true;
  }

  async handleRegister(email: string, password: string) {
    try {
      this.loading = true;
      const {user, error} = await this.authService.signUp(email, password);

      if (error) {
        throw error;
      }

      this.router.navigate(['home']); // I don't know why this is not working, kind of mssing something here

      this.successMessage = 'A confirmation email has been sent to your email address.';
    } catch (error) {
      const err = error as any
      if (err!.status === 400) {
        this.errorMessage = err.message;
      }
    } finally {
      this.loading = false;
    }
  }

  async handleLogin(email: string, password: string) {
    try {
      this.errorMessage = undefined;
      this.loading = true;
      const {user, error} = await this.authService.signIn(email, password);

      if (error) {
        throw error;
      }

      this.router.navigate(['home']);

    } catch (error) {
      const err = error as any
      if (err!.status === 400) {
        this.errorMessage = err.message;
      }
    } finally {
      this.loading = false;
    }
  }
}
