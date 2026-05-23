import { Component } from '@angular/core';
import { LandingNavbar } from '../../navbars/landing-navbar/landing-navbar';
import { LandingFooter } from '../../footers/landing-footer/landing-footer';

@Component({
  selector: 'app-landing-layout',
  imports: [LandingNavbar, LandingFooter],
  templateUrl: './landing-layout.html',
})
export class LandingLayout {}
