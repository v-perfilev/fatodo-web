import {EventMessageParams, EventMessageType, Message} from '../../models/message.model';
import {User} from '../../models/user.model';
import {TFunction} from 'i18next';

export class MessageUtils {
  public static parseEventMessage = (message: Message): EventMessageParams => {
    return message.isEvent ? (JSON.parse(message.text) as EventMessageParams) : null;
  };

  public static buildEventMessageText = (
    message: Message,
    params: EventMessageParams,
    users: User[],
    t: TFunction
  ): string => {
    let text = '';
    const username = MessageUtils.extractUsernameFromMessage(users, message);
    const usernames = MessageUtils.extractUsernamesFromParams(users, params);
    const title = MessageUtils.extractTextFromParams(params);
    if (
      params?.type === EventMessageType.CREATE_DIRECT_CHAT ||
      params?.type === EventMessageType.CREATE_CHAT ||
      params?.type === EventMessageType.ADD_MEMBERS ||
      params?.type === EventMessageType.DELETE_MEMBERS
    ) {
      text = t('message:event.' + params.type, {username, usernames});
    } else if (params?.type === EventMessageType.RENAME_CHAT) {
      text = t('message:event.' + params.type, {username, title});
    } else if (params?.type === EventMessageType.LEAVE_CHAT) {
      text = t('message:event.' + params.type, {username});
    }
    return text;
  };

  public static isReadMessage = (message: Message, account: User): boolean => {
    const readUserIds = message?.statuses.filter((status) => status.type === 'READ').map((status) => status.userId);
    return readUserIds && readUserIds.includes(account?.id);
  };

  public static extractUserFromMessage = (users: User[], message: Message): User => {
    return users.find((user) => user.id === message.userId);
  };

  public static extractUsernameFromMessage = (users: User[], message: Message): string => {
    const user = users.find((user) => user.id === message.userId);
    return user?.username || '';
  };

  public static extractUsernamesFromParams = (users: User[], params: EventMessageParams): string => {
    const eventUsers = users.filter((user) => params?.ids?.includes(user.id)).map((user) => user.username);
    return eventUsers && eventUsers.length > 0 ? eventUsers.join(', ') : '';
  };

  public static extractTextFromParams = (params: EventMessageParams): string => {
    return params?.text || '';
  };
}