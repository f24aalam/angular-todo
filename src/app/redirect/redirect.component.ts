import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  session = this.authService.session;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {

    if (this.session) {
      this.router.navigate(['home']);
    }

    this.authService.authChanges((_, session) => {
      this.session = session;
      this.router.navigate(['home']);
    });
  }

}
