import {AbstractAuditing} from './abstract-auditing.model';
import {PageableList} from './pageable-list.model';

export const commentReactionTypes = ['LIKE', 'DISLIKE'];

export type CommentReactionType = 'LIKE' | 'DISLIKE';

export interface Comment extends AbstractAuditing {
  id: string;
  threadId: string;
  parentId: string;
  userId: string;
  text: string;
  isDeleted: boolean;

  reactions: CommentReaction[];

  children: PageableList<Comment>;
}

export interface CommentReaction {
  commentId: string;
  userId: string;
  type: CommentReactionType;
  timestamp: Date;
}

export interface CommentReactions {
  threadId: string;
  commentId: string;
  reactions: CommentReaction[];
}

export interface EventMessageParams {
  type: EventMessageType;
  text?: string;
  ids?: string[];
}

export enum EventMessageType {
  CREATE_DIRECT_CHAT = 'CREATE_DIRECT_CHAT',
  CREATE_CHAT = 'CREATE_CHAT',
  RENAME_CHAT = 'RENAME_CHAT',
  LEAVE_CHAT = 'LEAVE_CHAT',
  ADD_MEMBERS = 'ADD_MEMBERS',
  DELETE_MEMBERS = 'DELETE_MEMBERS',
}
