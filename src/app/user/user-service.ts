import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  getUser() {
    return this.httpClient.get<User | null>(
      `${environment.apiServerUrl}/api/v1/account/find/profile`,
    );
  }
}
