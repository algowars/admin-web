import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, of, isObservable } from 'rxjs';

import { userGuard } from './user-guard';
import { Auth0Store } from '../auth/auth0-store';
import { UserStore } from './user-store';

describe('userGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userGuard(...guardParameters));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect to /forbidden when Auth0 is not authenticated', async () => {
    const mockAuth0Store = {
      isAuthenticated: signal(false),
    };
    const mockUserStore = {
      isAuthenticated: signal(true),
    };
    const forbiddenTree = { path: '/forbidden' };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(forbiddenTree),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth0Store, useValue: mockAuth0Store },
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guardResult = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    const result = await firstValueFrom(isObservable(guardResult) ? guardResult : of(guardResult));
    expect(result).toBe(forbiddenTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/forbidden']);
  });

  it('should redirect to /forbidden when user is not authenticated', async () => {
    const mockAuth0Store = {
      isAuthenticated: signal(true),
    };
    const mockUserStore = {
      isAuthenticated: signal(false),
    };
    const forbiddenTree = { path: '/forbidden' };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(forbiddenTree),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth0Store, useValue: mockAuth0Store },
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guardResult = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    const result = await firstValueFrom(isObservable(guardResult) ? guardResult : of(guardResult));

    expect(result).toBe(forbiddenTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/forbidden']);
  });
});
