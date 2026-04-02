import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCallback } from './auth-callback';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../auth0-store';
import { ActivatedRoute } from '@angular/router';

describe('AuthCallback', () => {
  let component: AuthCallback;
  let fixture: ComponentFixture<AuthCallback>;

  beforeEach(async () => {
    const mockAuthService = {
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
    };

    const mockAuthStore = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [AuthCallback, ProgressSpinnerModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Auth0Store, useValue: mockAuthStore },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthCallback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
