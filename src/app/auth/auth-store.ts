import { signalStore, type, withHooks, withState } from '@ngrx/signals';
import { withCallState, withImmutableState } from '@angular-architects/ngrx-toolkit';
import { eventGroup, injectDispatch, withEventHandlers } from '@ngrx/signals/events';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

interface AuthInitialState {
  isAuthenticated: boolean;
}

const initialState: AuthInitialState = {
  isAuthenticated: false,
};

export const AuthEvents = eventGroup({
  source: '[Global] Auth Events',
  events: {
    authenticate: type<boolean>(),
  },
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withImmutableState(initialState),

  withCallState(),

  withEventHandlers((store) => ({})),

  withHooks(() => ({
    onInit() {
      const authService = inject(AuthService);
      const authDispatch = injectDispatch(AuthEvents);
      const isAuthenticated = toSignal(authService.isAuthenticated$);

      if (isAuthenticated()) {
        authDispatch.authenticate(true);
      }
    },
  })),
);
