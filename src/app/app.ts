import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { Auth0Store } from './auth/auth0-store';
import { UserStore } from './user/user-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.html',
  providers: [],
})
export class App {
  private readonly auth0Store = inject(Auth0Store);
  private readonly userStore = inject(UserStore);
}
