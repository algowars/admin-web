import { Component, computed, inject, Signal, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly auth = inject(AuthService);

  constructor() {
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log('ID Token Claims:', claims);
    });
  }
  private readonly isAuthenticated = toSignal(this.auth.isAuthenticated$);

  private readonly baseMenuItems = signal([
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/',
    },
  ]).asReadonly();

  private readonly authMenuItems = signal([
    {
      label: 'Profile',
      icon: 'pi pi-user',
      routerLink: '/profile',
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ]).asReadonly();

  private readonly unauthMenuItems = computed(() => [
    {
      label: 'Login',
      icon: 'pi pi-sign-in',
      command: () => this.login(),
    },
  ]);

  readonly menuItems: Signal<MenuItem[]> = computed(() => [
    ...this.baseMenuItems(),
    ...(this.isAuthenticated() ? this.authMenuItems() : this.unauthMenuItems()),
  ]);

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
