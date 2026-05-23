import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStore } from './user-store';

export const noUserGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);

  return !userStore.isAuthenticated();
};
