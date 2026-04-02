import { Component, inject } from '@angular/core';
import { LandingLayout } from '../shared/layouts/landing-layout/landing-layout';
import { Location } from '@angular/common';
import { Button, ButtonDirective } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  imports: [LandingLayout, Button, RouterLink, ButtonDirective],
  templateUrl: './forbidden.html',
})
export class Forbidden {
  private readonly location = inject(Location);

  goBack() {
    this.location.back();
  }
}
