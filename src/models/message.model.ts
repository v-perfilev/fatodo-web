import {AbstractAuditing} from './abstract-auditing.model';

export type MessageStatusType = 'READ';
export type MessageReactionType = 'LIKE' | 'DISLIKE';

export interface Message extends AbstractAuditing {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  forwardedMessage: Message;

  isEvent: boolean;

  statuses: MessageStatus[];
  reactions: MessageReaction[];
}

export interface MessageStatus {
  messageId: string;
  userId: string;
  type: MessageStatusType;
  timestamp: Date;
}

export interface MessageReaction {
  messageId: string;
  userId: string;
  type: MessageReactionType;
  timestamp: Date;
}
