import {AbstractAuditing} from './abstract-auditing.model';
import {Message} from './message.model';

export interface Chat extends AbstractAuditing {
  id: string;
  title: string;
  isDirect: boolean;

  members: string[];
  lastMessage: Message;
}
