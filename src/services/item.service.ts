import axios, {AxiosPromise} from 'axios';
import {ItemDTO} from '../models/dto/item.dto';
import {GroupMember} from '../models/group.model';

export default class ItemService {
  private static baseUrl = '/api/item';

  // GroupResource

  public static getAllGroups = (): AxiosPromise => {
    const url = ItemService.baseUrl + '/groups';
    return axios.get(url);
  };

  public static getGroup = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/groups/' + id;
    return axios.get(url);
  };

  public static createGroup = (formData: FormData): AxiosPromise => {
    const url = ItemService.baseUrl + '/groups';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.post(url, formData, config);
  };

  public static updateGroup = (formData: FormData): AxiosPromise => {
    const url = ItemService.baseUrl + '/groups';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.put(url, formData, config);
  };

  public static deleteGroup = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/groups/' + id;
    return axios.delete(url);
  };

  // ItemResource

  public static getAllItemsByGroupId = (groupId: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + groupId + '/group-id';
    return axios.get(url);
  };

  public static getItem = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.get(url);
  };

  public static createItem = (dto: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.post(url, dto);
  };

  public static updateItem = (dto: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.put(url, dto);
  };

  public static deleteItem = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.delete(url);
  };

  // ConfigurationController

  public static setGroupOrder = (order: string[]): AxiosPromise => {
    const url = ItemService.baseUrl + '/configuration/order';
    return axios.post(url, order);
  };

  // MemberController

  public static addMembersToGroup = (groupId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/members/group/' + groupId + '/add';
    return axios.post(url, userIds);
  };

  public static removeMembersFromGroup = (groupId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/members/group/' + groupId + '/remove';
    return axios.post(url, userIds);
  };

  public static editGroupMember = (groupId: string, member: GroupMember): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/members/group/' + groupId + '/edit';
    return axios.post(url, member);
  };

  public static leaveGroup = (groupId: string): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/members/group/' + groupId + '/leave';
    return axios.get(url);
  };
}
