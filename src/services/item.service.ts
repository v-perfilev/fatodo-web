import axios, {AxiosPromise} from 'axios';
import {ItemDTO} from '../models/dto/item.dto';

export default class ItemService {
  private static baseUrl = '/api/item';

  public static get = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.get(url);
  };

  public static create = (data: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.post(url, data);
  };

  public static update = (data: ItemDTO): AxiosPromise => {
    const url = ItemService.baseUrl + '/items';
    return axios.put(url, data);
  };

  public static delete = (id: string): AxiosPromise => {
    const url = ItemService.baseUrl + '/items/' + id;
    return axios.delete(url);
  };
}
