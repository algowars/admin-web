import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { Home } from './home/home';
import { AuthGuard } from '@auth0/auth0-angular';
import { userGuard } from './user/user-guard';
import { permissionGuard } from './user/permission-guard';
import { UserPermission } from './user/user-permission';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, userGuard, permissionGuard([UserPermission.ViewDashboard], 'all')],
    component: Home,
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./forbidden/forbidden').then((m) => m.Forbidden),
  },
  {
    path: '**',
    component: NotFound,
  },
];
