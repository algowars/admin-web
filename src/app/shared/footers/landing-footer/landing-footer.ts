import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-footer',
  imports: [],
  templateUrl: './landing-footer.html',
})
export class LandingFooter {
  readonly currentYear = new Date().getFullYear();
}
