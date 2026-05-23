import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withImmutableState,
} from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { signalStore, type, withComputed, withHooks } from '@ngrx/signals';
import {
  eventGroup,
  Events,
  injectDispatch,
  on,
  withEventHandlers,
  withReducer,
} from '@ngrx/signals/events';
import { ErrorService } from '../errors/error-service';
import { userEvents } from '../user/user-store';
import { tap } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';

export interface Auth0State {
  user: User | null;
  isAuthenticated: boolean;
}

export const auth0Events = eventGroup({
  source: '[Global] Auth0',
  events: {
    loadUser: type<void>(),
    loadUserSuccess: type<User>(),
    loadUserFailure: type<unknown>(),
    authenticate: type<void>(),
    authenticateSuccess: type<boolean>(),
    authenticateFailure: type<unknown>(),
  },
});

export interface Auth0StoreState {
  _isAuthenticated: boolean;
}

export const initialState: Auth0StoreState = {
  _isAuthenticated: false,
};

export const Auth0Store = signalStore(
  { providedIn: 'root' },
  withImmutableState(initialState),
  withCallState(),
  withComputed((state) => ({
    isAuthenticated: state._isAuthenticated,
  })),
  withReducer(
    on(auth0Events.loadUser, () => setLoading()),
    on(auth0Events.loadUserSuccess, ({ payload: user }) => [
      { _isAuthenticated: !!user },
      setLoaded(),
    ]),
    on(auth0Events.loadUserFailure, ({ payload: error }) => setError(error)),
    on(auth0Events.authenticate, () => setLoading()),
    on(auth0Events.authenticateSuccess, ({ payload: isAuthenticated }) => [
      { _isAuthenticated: isAuthenticated },
      setLoaded(),
    ]),
    on(auth0Events.authenticateFailure, ({ payload: error }) => setError(error)),
  ),
  withEventHandlers(
    (
      store,
      events = inject(Events),
      errorService = inject(ErrorService),
      userDispatch = injectDispatch(userEvents),
    ) => ({
      authenticateSuccess$: events.on(auth0Events.authenticateSuccess).pipe(
        tap((event) => {
          if (event.payload) {
            userDispatch.loadUser();
          }
        }),
      ),
      authenticateFailure$: events.on(auth0Events.authenticateFailure).pipe(
        tap((event) => {
          errorService.logError(event.payload);
        }),
      ),
      loadUserFailure$: events.on(auth0Events.loadUserFailure).pipe(
        tap((event) => {
          errorService.logError(event.payload);
        }),
      ),
    }),
  ),
  withHooks(() => ({
    onInit() {
      const auth = inject(AuthService);
      const auth0Dispatch = injectDispatch(auth0Events);

      auth0Dispatch.authenticate();
      auth0Dispatch.loadUser();

      auth.user$.subscribe((user) => {
        if (user) {
          auth0Dispatch.loadUserSuccess(user);
        }
      });

      auth.isAuthenticated$.subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          auth0Dispatch.authenticateSuccess(isAuthenticated);
        }
      });
    },
  })),
);
