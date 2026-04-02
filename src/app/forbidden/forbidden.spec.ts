import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forbidden } from './forbidden';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Store } from '../auth/auth0-store';

describe('Forbidden', () => {
  let component: Forbidden;
  let fixture: ComponentFixture<Forbidden>;

  beforeEach(async () => {
    const mockAuthService = {
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
    };

    const mockAuthStore = {
      isAuthenticated: vi.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [Forbidden],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Auth0Store, useValue: mockAuthStore },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Forbidden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
