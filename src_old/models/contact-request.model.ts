import {User} from './user.model';

export interface ContactRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  message: string;
}

export interface ContactRequestWithUser extends ContactRequest {
  user: User;
}
