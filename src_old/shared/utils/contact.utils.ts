import {User} from '../../models/user.model';
import {ContactRelation} from '../../models/contact-relation.model';
import {ContactRequest} from '../../models/contact-request.model';

export class ContactUtils {
  public static isContact = (user: User, relations: ContactRelation[]): boolean => {
    const relation = relations.find((r) => r.secondUserId === user.id);
    return !!relation;
  };

  public static isOutcomingRequest = (user: User, requests: ContactRequest[]): boolean => {
    const request = requests.find((r) => r.recipientId === user.id);
    return !!request;
  };

  public static isIncomingRequest = (user: User, requests: ContactRequest[]): boolean => {
    const request = requests.find((r) => r.requesterId === user.id);
    return !!request;
  };
}
