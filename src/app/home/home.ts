import { Component, inject } from '@angular/core';
import { LandingLayout } from '../shared/layouts/landing-layout/landing-layout';
import { ButtonDirective, Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { auth0Login } from '../auth/auth0-actions';

@Component({
  selector: 'app-home',
  imports: [LandingLayout, ButtonDirective, RouterLink, Button],
  templateUrl: './home.html',
})
export class Home {
  private readonly auth = inject(AuthService);

  logIn() {
    this.auth.loginWithRedirect(auth0Login);
  }
}
