import {AbstractAuditing} from './abstract-auditing.model';

export const commentReactionTypes = ['LIKE', 'DISLIKE'];

export type CommentReactionType = 'LIKE' | 'DISLIKE';

export interface Comment extends AbstractAuditing {
  id: string;
  threadId: string;
  userId: string;
  text: string;
  isDeleted: boolean;

  reference?: ReferenceComment;

  reactions: CommentReaction[];
}

export interface ReferenceComment extends AbstractAuditing {
  id: string;
  userId: string;
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
