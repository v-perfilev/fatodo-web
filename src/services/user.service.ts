import axios, {AxiosPromise} from 'axios';

export default class UserService {
  private static baseUrl = '/api/user';

  public static getAllByIds = (ids: string[]): AxiosPromise => {
    const url = UserService.baseUrl + '/user/all-by-ids';
    return axios.post(url, ids);
  };

  public static getCurrent = (): AxiosPromise => {
    const url = UserService.baseUrl + '/user';
    return axios.get(url);
  };

  public static isEmailUnique = (value: string): AxiosPromise => {
    const url = UserService.baseUrl + '/check/email/' + value + '/unique';
    return axios.get(url);
  };

  public static isUsernameUnique = (value: string): AxiosPromise => {
    const url = UserService.baseUrl + '/check/username/' + value + '/unique';
    return axios.get(url);
  };
}
