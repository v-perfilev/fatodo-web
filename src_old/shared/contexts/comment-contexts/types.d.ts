import {Comment, CommentReactions} from '../../../models/comment.model';

export interface WsCommentState {
  selectCommentTargetIdForWs: (targetId: string) => void;
  commentNewEvent: Comment;
  commentUpdateEvent: Comment;
  commentReactionsEvent: CommentReactions;
}
