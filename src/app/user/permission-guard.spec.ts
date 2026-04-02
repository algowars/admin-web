import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { permissionGuard } from './permission-guard';
import { UserStore } from './user-store';
import { UserPermission } from './user-permission';

describe('permissionGuard', () => {
  const executeGuard = (
    permissions: UserPermission[],
    mode?: 'any' | 'all',
  ): CanActivateFn => {
    return (...guardParameters) =>
      TestBed.runInInjectionContext(() => permissionGuard(permissions, mode)(...guardParameters));
  };

  it('should be created', () => {
    expect(permissionGuard).toBeTruthy();
  });

  it('should return true when all required permissions are present in all mode', () => {
    const mockUserStore = {
      user: vi.fn().mockReturnValue({
        permissions: [UserPermission.ViewDashboard],
      }),
    };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue({ path: '/forbidden' }),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guard = executeGuard([UserPermission.ViewDashboard], 'all');
    expect(guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });

  it('should return url tree when one required permission is missing in all mode', () => {
    const forbiddenTree = { path: '/forbidden' };
    const mockUserStore = {
      user: vi.fn().mockReturnValue({
        permissions: [],
      }),
    };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(forbiddenTree),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guard = executeGuard([UserPermission.ViewDashboard], 'all');
    expect(guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(forbiddenTree);
    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/forbidden']);
  });

  it('should return true when at least one required permission is present in any mode', () => {
    const mockUserStore = {
      user: vi.fn().mockReturnValue({
        permissions: [UserPermission.ViewDashboard],
      }),
    };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue({ path: '/forbidden' }),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guard = executeGuard([UserPermission.ViewDashboard], 'any');
    expect(guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(true);
  });

  it('should default to all mode when mode is not provided', () => {
    const forbiddenTree = { path: '/forbidden' };
    const mockUserStore = {
      user: vi.fn().mockReturnValue({
        permissions: [],
      }),
    };
    const mockRouter = {
      createUrlTree: vi.fn().mockReturnValue(forbiddenTree),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStore, useValue: mockUserStore },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const guard = executeGuard([UserPermission.ViewDashboard]);
    expect(guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(forbiddenTree);
  });
});
