import axios, {AxiosPromise} from 'axios';
import {MessageDTO} from '../models/dto/message.dto';
import {Chat} from '../models/chat.model';
import {Message} from '../models/message.model';

export default class ChatService {
  private static baseUrl = '/api/chat';

  /*
    ChatController
   */
  public static getAllChatsPageable = (offset?: number, size?: number): AxiosPromise<Chat[]> => {
    const url = ChatService.baseUrl + '/chat';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getFilteredChats = (filter: string): AxiosPromise<Chat[]> => {
    const url = ChatService.baseUrl + '/chat/filtered/' + filter;
    return axios.get(url);
  };

  public static getChatById = (id: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/' + id;
    return axios.get(url);
  };

  public static createDirectChat = (userId: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/create-direct/' + userId;
    return axios.get(url);
  };

  public static createIndirectChat = (userIds: string[]): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/create-indirect';
    return axios.post(url, userIds);
  };

  public static renameChat = (id: string, title: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/rename/' + id;
    return axios.post(url, title);
  };

  public static getUnreadMessagesMap = (): AxiosPromise<Map<string, string[]>> => {
    const url = ChatService.baseUrl + '/chat/unread-messages-map';
    return axios.get(url);
  };

  /*
    MemberController
   */
  public static addUsersToChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/add/' + chatId;
    return axios.post(url, userIds);
  };

  public static removeUsersFromChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/remove/' + chatId;
    return axios.post(url, userIds);
  };

  public static leaveChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/leave/' + chatId;
    return axios.get(url);
  };

  public static cleanChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/clear/' + chatId;
    return axios.get(url);
  };

  public static deleteChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/delete/' + chatId;
    return axios.get(url);
  };

  /*
    MessageController
   */
  public static getAllMessagesByChatIdPageable = (
    chatId: string,
    offset?: number,
    size?: number
  ): AxiosPromise<Message[]> => {
    const url = ChatService.baseUrl + '/message/' + chatId;
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static sendDirectMessage = (userId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/direct/' + userId;
    return axios.post(url, dto);
  };

  public static sendIndirectMessage = (chatId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/' + chatId;
    return axios.post(url, dto);
  };

  public static editMessage = (messageId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/' + messageId;
    return axios.put(url, dto);
  };

  public static deleteMessage = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/message/' + messageId;
    return axios.delete(url);
  };

  /*
    ReactionController
   */
  public static likeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/like/' + messageId;
    return axios.get(url);
  };

  public static dislikeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/dislike/' + messageId;
    return axios.get(url);
  };

  public static noneMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/none/' + messageId;
    return axios.get(url);
  };

  /*
    StatusController
   */
  public static markMessageAsRead = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/status/read/' + messageId;
    return axios.get(url);
  };
}
