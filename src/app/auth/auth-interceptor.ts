import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { authHttpInterceptorFn } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

export function customAuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return authHttpInterceptorFn(req, next);
}
