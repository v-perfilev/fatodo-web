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

  public static create = (formData: FormData): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.post(url, formData, config);
  };

  public static update = (formData: FormData): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.put(url, formData, config);
  };

  public static delete = (id: string): AxiosPromise => {
    const url = GroupService.baseUrl + '/groups/' + id;
    return axios.delete(url);
  };

  public static setGroupOrder = (order: string[]): AxiosPromise => {
    const url = GroupService.baseUrl + '/configuration/order';
    return axios.post(url, order);
  };
}
