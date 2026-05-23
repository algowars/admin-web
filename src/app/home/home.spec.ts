import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../auth/auth0-store';
import { ActivatedRoute } from '@angular/router';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    const mockAuthService = {
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
    };

    const mockAuthStore = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Auth0Store, useValue: mockAuthStore },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
