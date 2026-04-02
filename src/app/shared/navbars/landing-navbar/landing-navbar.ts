import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, Button } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../../../auth/auth0-store';
import { auth0Login, auth0Logout, auth0SignUp } from '../../../auth/auth0-actions';

interface NavItems {
  label: string;
  path?: string;
  onClick?: () => void;
  variant?: Button['variant'];
  severity?: Button['severity'];
  size?: Button['size'];
}

@Component({
  selector: 'app-landing-navbar',
  imports: [RouterLink, ButtonDirective, Button],
  templateUrl: './landing-navbar.html',
})
export class LandingNavbar {
  private readonly auth = inject(AuthService);
  private readonly authStore = inject(Auth0Store);

  private readonly authenticatedRoutes: NavItems[] = [
    {
      label: 'Log out',
      onClick: () => this.logOut(),
      size: 'small',
    },
  ];

  private readonly unauthenticatedRoutes: NavItems[] = [
    {
      label: 'Log In',
      onClick: () => this.logIn(),
      variant: 'text',
      severity: 'secondary',
      size: 'small',
    },
    { label: 'Sign Up', onClick: () => this.signUp(), size: 'small' },
  ];

  protected navItems = computed<NavItems[]>(() => [
    { label: 'Home', path: '/', variant: 'text', severity: 'secondary', size: 'small' },
    {
      label: 'Problems',
      path: '/problems',
      variant: 'text',
      severity: 'secondary',
      size: 'small',
    },
    ...(this.authStore.isAuthenticated() ? this.authenticatedRoutes : this.unauthenticatedRoutes),
  ]);

  logIn() {
    this.auth.loginWithRedirect(auth0Login);
  }

  signUp() {
    this.auth.loginWithRedirect(auth0SignUp);
  }

  logOut() {
    this.auth.logout(auth0Logout);
  }
}
