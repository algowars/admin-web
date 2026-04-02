import { Component } from '@angular/core';
import { LandingLayout } from '../../shared/layouts/landing-layout/landing-layout';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-auth-callback',
  imports: [LandingLayout, ProgressSpinnerModule],
  template: `
    <app-landing-layout>
      <div class="flex justify-center items-center py-40">
        <p-progress-spinner ariaLabel="Loading account information" class="mx-auto" />
      </div>
    </app-landing-layout>
  `,
})
export class AuthCallback {}
