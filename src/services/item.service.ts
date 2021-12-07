import axios, {AxiosPromise} from 'axios';
import {ItemDTO} from '../models/dto/item.dto';
import {Group, GroupMember} from '../models/group.model';
import {PageableList} from '../models/pageable-list.model';
import {Item} from '../models/item.model';

export default class ItemService {
  private static baseUrl = '/api/item';

  // GroupResource

  public static getAllGroups = (): AxiosPromise<Group[]> => {
    const url = ItemService.baseUrl + '/groups';
    return axios.get(url);
  };

  public static getGroup = (id: string): AxiosPromise<Group> => {
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

  public static getPreviewItemsByGroupIds = (groupIds: string[]): AxiosPromise<Map<string, PageableList<Item>>> => {
    const url = ItemService.baseUrl + '/items/preview/group-ids';
    return axios.post(url, groupIds);
  };

  public static getItemsByGroupId = (
    groupId: string,
    offset?: number,
    size?: number
  ): AxiosPromise<PageableList<Item>> => {
    const url = ItemService.baseUrl + '/items/' + groupId + '/group-id';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getArchivedItemsByGroupId = (
    groupId: string,
    offset?: number,
    size?: number
  ): AxiosPromise<PageableList<Item>> => {
    const url = ItemService.baseUrl + '/items/archived/' + groupId + '/group-id';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getItem = (id: string): AxiosPromise<Item> => {
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
