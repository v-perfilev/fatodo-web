import axios, {AxiosPromise} from 'axios';

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

  public static create = (data: FormData): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, data, config);
  };

  public static update = (data: FormData): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.put(url, data, config);
  };

  public static delete = (id: string): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups/' + id;
    return axios.delete(url);
  };
}
