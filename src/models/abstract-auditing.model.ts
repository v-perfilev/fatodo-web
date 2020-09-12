import {User} from './user.model';

export interface AbstractAuditing {
  createdBy?: User;
  createdAt?: string;
  updatedBy?: User;
  updatedAt?: string;
}
