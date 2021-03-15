import {Chat} from '../../models/chat.model';
import {User} from '../../models/user.model';

export class ChatUtils {

  public static getUsernames = (chat: Chat, users: User[]): string => {
    return users
      .filter((user) => chat.members.includes(user.id))
      .map((user) => user.username)
      .join(', ');
  };

  public static getTitle = (chat: Chat, users: User[], account: User): string => {
    return chat.title
      ? chat.title
      : users
        .filter((user) => chat.members.includes(user.id) && user.id !== account.id)
        .map((user) => user.username)
        .join(', ');
  };

}
