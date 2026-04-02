import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { noUserGuard } from './no-user-guard';
import { UserStore } from './user-store';

describe('noUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => noUserGuard(...guardParameters));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if the user is not authenticated', () => {
    const mockUserStore = {
      isAuthenticated: vi.fn().mockReturnValue(false),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: UserStore, useValue: mockUserStore }],
    });

    expect(executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });

  it('should return false if the user is authenticated', () => {
    const mockUserStore = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: UserStore, useValue: mockUserStore }],
    });

    expect(executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(false);
  });
});
