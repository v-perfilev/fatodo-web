import axios, {AxiosPromise} from 'axios';
import {GroupDTO} from '../models/dto/group.dto';

export default class GroupService {
  private static baseUrl = '/api/group';

  public static getAll = (): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    return axios.get(url);
  };

  public static get = (id: string): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups/' + id;
    return axios.get(url);
  };

  public static create = (data: GroupDTO): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {headers: {'Content-Type': 'undefined'}};
    return axios.post(url, data, config);
  };

  public static update = (data: GroupDTO): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {headers: {'Content-Type': 'undefined'}};
    return axios.put(url, data, config);
  };

  public static delete = (id: string): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups/' + id;
    return axios.delete(url);
  };
}
