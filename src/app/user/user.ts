import { UserPermission } from './user-permission';

export interface User {
  id: string;
  username: string;
  createdAt: Date;
  avatar: string;
  permissions: UserPermission[];
}
