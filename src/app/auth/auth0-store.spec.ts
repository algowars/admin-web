import { TestBed } from '@angular/core/testing';
import { auth0Events, Auth0Store } from './auth0-store';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ErrorService } from '../errors/error-service';
import { injectDispatch } from '@ngrx/signals/events';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../user/user-service';

describe('Auth0Store', () => {
  test.each([true, false])(
    'isAuthenticated should be %s when user is authenticated',
    (isAuthenticated: boolean) => {
      const authServiceMock = {
        isAuthenticated$: of(isAuthenticated),
        user$: of(isAuthenticated ? { sub: '123' } : null),
      };

      TestBed.configureTestingModule({
        providers: [{ provide: AuthService, useValue: authServiceMock }],
      });

      const store = TestBed.inject(Auth0Store);

      expect(store.isAuthenticated()).toBe(isAuthenticated);
    },
  );

  it("loadUserFailure should log error when there's a failure", () => {
    const authServiceMock = {
      isAuthenticated$: of(false),
      user$: of(null),
    };

    const mockErrorService = {
      logError: vi.fn(),
    };

    const mockMessageService = {
      add: vi.fn(),
    };

    const mockRouter = {
      navigate: vi.fn(),
    };

    const mockUserService = {
      getUser: vi.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });

    TestBed.inject(Auth0Store);
    const auth0Dispatch = TestBed.runInInjectionContext(() => injectDispatch(auth0Events));

    const error = new Error('Failed to load user');
    auth0Dispatch.loadUserFailure(error);

    expect(mockErrorService.logError).toHaveBeenCalledWith(error);
  });

  it('should log error when authenticateFailure is dispatched', () => {
    const authServiceMock = {
      isAuthenticated$: of(false),
      user$: of(null),
    };

    const mockErrorService = {
      logError: vi.fn(),
    };

    const mockMessageService = {
      add: vi.fn(),
    };

    const mockRouter = {
      navigate: vi.fn(),
    };

    const mockUserService = {
      getUser: vi.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });

    TestBed.inject(Auth0Store);
    const auth0Dispatch = TestBed.runInInjectionContext(() => injectDispatch(auth0Events));

    const error = new Error('Auth0 authentication failed');
    auth0Dispatch.authenticateFailure(error);

    expect(mockErrorService.logError).toHaveBeenCalledWith(error);
  });
});
