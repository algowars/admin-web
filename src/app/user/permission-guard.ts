import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserPermission } from './user-permission';
import { UserStore } from './user-store';

export type PermissionGuardMode = 'any' | 'all';

export const permissionGuard = (
  requiredPermissions: UserPermission[],
  mode: PermissionGuardMode = 'all',
): CanActivateFn => {
  return () => {
    const userStore = inject(UserStore);
    const router = inject(Router);
    const userPermissions = userStore.user()?.permissions ?? [];

    if (requiredPermissions.length === 0) {
      return true;
    }

    const hasRequiredPermissions =
      mode === 'any'
        ? requiredPermissions.some((permission) => userPermissions.includes(permission))
        : requiredPermissions.every((permission) => userPermissions.includes(permission));

    return hasRequiredPermissions ? true : router.createUrlTree(['/forbidden']);
  };
};
