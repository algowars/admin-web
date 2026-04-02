import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth0Store } from '../auth/auth0-store';
import { UserStore } from './user-store';
import { combineLatest, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const userGuard: CanActivateFn = () => {
  const authStore = inject(Auth0Store);
  const userStore = inject(UserStore);
  const router = inject(Router);

  const isAuth0Authenticated$ = toObservable(authStore.isAuthenticated);
  const isUserAuthenticated$ = toObservable(userStore.isAuthenticated);

  return combineLatest([isAuth0Authenticated$, isUserAuthenticated$]).pipe(
    map(([isAuth0Authenticated, isUserAuthenticated]) => {
      if (isAuth0Authenticated && isUserAuthenticated) {
        return true;
      }

      return router.createUrlTree(['/forbidden']);
    }),
  );
};
