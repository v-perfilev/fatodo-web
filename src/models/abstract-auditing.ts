import {User} from './user';

export interface AbstractAuditing {
  createdBy?: User;
  createdAt?: string;
  updatedBy?: User;
  updatedAt?: string;
}
