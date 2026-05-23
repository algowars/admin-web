import { TestBed } from '@angular/core/testing';
import { userEvents, UserStore } from './user-store';
import { patchState } from '@ngrx/signals';
import { unprotected } from '@ngrx/signals/testing';
import { MessageService } from 'primeng/api';
import { injectDispatch } from '@ngrx/signals/events';
import { UserService } from './user-service';
import { ErrorService } from '../errors/error-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserStore', () => {
  beforeEach(() => {
    const mockMessageService = {
      add: vi.fn(),
    };

    const mockErrorService = {
      logError: vi.fn(),
    };

    const mockRouter = {
      navigate: vi.fn(),
    };

    const mockUserService = {
      getUser: vi.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: mockMessageService },
        { provide: ErrorService, useValue: mockErrorService },
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });
  });

  it('isAuthenticated should return true if authenticated', () => {
    const store = TestBed.inject(UserStore);

    const expectedUser = {
      id: '123',
      username: 'Test User',
      createdAt: new Date(),
      avatar: 'avatar.png',
    };
    patchState(unprotected(store), { user: expectedUser });

    expect(store.isAuthenticated()).toBe(true);
  });

  it('loadUser should get the user from the user service', () => {
    const expectedUser = {
      id: '123',
      username: 'Test User',
      createdAt: new Date(),
      avatar: 'avatar.png',
    };

    const mockUserService = {
      getUser: vi.fn().mockReturnValue(of(expectedUser)),
    };

    TestBed.overrideProvider(UserService, { useValue: mockUserService });

    const store = TestBed.inject(UserStore);
    const userDispatch = TestBed.runInInjectionContext(() => injectDispatch(userEvents));

    userDispatch.loadUser();

    expect(mockUserService.getUser).toHaveBeenCalled();
    expect(store.user()).toEqual(expectedUser);
  });

  it('loadUserFailure should loge error if the user service fails', () => {
    TestBed.inject(UserStore);
    const mockErrorService = TestBed.inject(ErrorService);
    const mockMessageService = TestBed.inject(MessageService);
    const userDispatch = TestBed.runInInjectionContext(() => injectDispatch(userEvents));

    const error = new Error('Failed to load user');
    userDispatch.loadUserFailure(error);

    expect(mockErrorService.logError).toHaveBeenCalledWith(error);
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load user.',
    });
  });

  it('loadUserFailure should navigate to /account/setup if the error status is 404', () => {
    TestBed.inject(UserStore);
    const mockRouter = TestBed.inject(Router);
    const userDispatch = TestBed.runInInjectionContext(() => injectDispatch(userEvents));

    const error = new HttpErrorResponse({ status: 404 });
    userDispatch.loadUserFailure(error);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/setup']);
  });
});
