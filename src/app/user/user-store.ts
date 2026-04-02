import { signalStore, type, withComputed } from '@ngrx/signals';
import { eventGroup, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import {
  setError,
  setLoaded,
  setLoading,
  withCallState,
  withImmutableState,
} from '@angular-architects/ngrx-toolkit';
import { User } from './user';
import { computed, inject } from '@angular/core';
import { exhaustMap, tap } from 'rxjs';
import { UserService } from './user-service';
import { mapResponse } from '@ngrx/operators';
import { ErrorService } from '../errors/error-service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export const userEvents = eventGroup({
  source: '[Global] User',
  events: {
    loadUser: type<void>(),
    loadUserSuccess: type<User | null>(),
    loadUserFailure: type<unknown>(),
    setUser: type<User>(),
  },
});

export interface UserStoreState {
  user: User | null;
}

const initialState: UserStoreState = {
  user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withImmutableState(initialState),
  withCallState(),
  withComputed((store) => ({
    isAuthenticated: computed(() => !!store.user()),
  })),
  withReducer(
    on(userEvents.loadUser, () => setLoading()),
    on(userEvents.loadUserSuccess, ({ payload: user }) => [{ user: user }, setLoaded()]),
    on(userEvents.loadUserFailure, ({ payload: error }) => [setError(error), setLoaded()]),
  ),
  withEventHandlers(
    (
      store,
      events = inject(Events),
      userService = inject(UserService),
      errorService = inject(ErrorService),
      messageService = inject(MessageService),
      router = inject(Router),
    ) => ({
      loadUser$: events.on(userEvents.loadUser).pipe(
        exhaustMap(() =>
          userService.getUser().pipe(
            mapResponse({
              next: (user: User | null) => {
                return userEvents.loadUserSuccess(user);
              },
              error: (error: unknown) => userEvents.loadUserFailure(error),
            }),
          ),
        ),
      ),
      loadUserFailure$: events.on(userEvents.loadUserFailure).pipe(
        tap((event) => {
          if (event.payload instanceof HttpErrorResponse && event.payload.status === 404) {
            router.navigate(['/account/setup']);
            return;
          }

          errorService.logError(event.payload);
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load user.',
          });
        }),
      ),
    }),
  ),
);
