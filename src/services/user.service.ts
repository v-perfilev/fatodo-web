import axios, {AxiosPromise} from 'axios';
import {ChangePasswordDTO} from '../models/dto/change-password.dto';

export default class UserService {
  private static baseUrl = '/api/user';

  public static getAllByIds = (ids: string[]): AxiosPromise => {
    const url = UserService.baseUrl + '/user/all-by-ids';
    return axios.post(url, ids);
  };

  public static getCurrent = (): AxiosPromise => {
    const url = UserService.baseUrl + '/account/current';
    return axios.get(url);
  };

  public static updateData = (data: FormData): AxiosPromise => {
    const url = UserService.baseUrl + '/account/update';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.post(url, data, config);
  };

  public static changePassword = (data: ChangePasswordDTO): AxiosPromise => {
    const url = UserService.baseUrl + '/account/change-password';
    return axios.post(url, data);
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
