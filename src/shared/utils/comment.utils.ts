import {User} from '../../models/user.model';
import {Comment} from '../../models/comment.model';

export class CommentUtils {
  public static isOwnComment = (comment: Comment, account: User): boolean => {
    return comment && account && comment.userId !== account.id;
  };

  public static extractUserFromComment = (users: User[], comment: Comment): User => {
    return users.find((user) => user.id === comment.userId);
  };

  public static extractUsernameFromComment = (users: User[], comment: Comment): string => {
    const user = users.find((user) => user.id === comment.userId);
    return user?.username || '';
  };
}
