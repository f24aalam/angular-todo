import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggingOut = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  async signOut() {
    this.loggingOut = true;
    await this.authService.signOut();
    this.router.navigate(['auth']);
  }

}
