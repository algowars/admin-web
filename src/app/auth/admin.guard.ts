import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

const ROLES_CLAIM = 'https://yourdomain.com/roles';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.idTokenClaims$.pipe(
    map((claims) => {
      const roles = claims?.[ROLES_CLAIM] as string[] | undefined;
      if (roles && roles.includes('admin')) {
        return true;
      }
      router.navigate(['/forbidden']);
      return false;
    }),
  );
};
