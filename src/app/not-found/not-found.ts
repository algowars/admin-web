import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';
import { LandingLayout } from '../shared/layouts/landing-layout/landing-layout';

@Component({
  selector: 'app-not-found',
  imports: [LandingLayout, RouterLink, ButtonDirective],
  templateUrl: './not-found.html',
})
export class NotFound {}
