import axios, {AxiosPromise} from 'axios';
import {ItemDTO} from '../models/dto/item.dto';

export default class ItemService {
  private static baseUrl = '/api/item';

  public static getAllByGroupId = (groupId: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/item/all-by-group-id/' + groupId;
    return axios.get(url);
  };

  public static get = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.get(url);
  };

  public static create = (dto: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.post(url, dto);
  };

  public static update = (dto: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.put(url, dto);
  };

  public static delete = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.delete(url);
  };
}
