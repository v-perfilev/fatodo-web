import {User} from './user.model';

export interface ContactRelation {
  id: string;
  firstUserId: string;
  secondUserId: string;
}

export interface ContactRelationWithUser extends ContactRelation {
  user: User;
}
