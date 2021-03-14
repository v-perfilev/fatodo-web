import axios, {AxiosPromise} from 'axios';
import {ChangePasswordDTO} from '../models/dto/change-password.dto';
import {User} from '../models/user.model';

export default class UserService {
  private static baseUrl = '/api/user';

  public static getAllByIds = (ids: string[]): AxiosPromise => {
    const url = UserService.baseUrl + '/user/all-by-ids';
    return axios.post(url, ids);
  };

  public static getByUsername = (username: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user/username/' + username;
    return axios.get(url);
  };

  public static getByUsernameOrEmail = (user: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user/username-or-email/' + user;
    return axios.get(url);
  };

  public static getCurrent = (): AxiosPromise => {
    const url = UserService.baseUrl + '/account/current';
    return axios.get(url);
  };

  public static updateAccount = (formData: FormData): AxiosPromise => {
    const url = UserService.baseUrl + '/account/update';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.post(url, formData, config);
  };

  public static changePassword = (dto: ChangePasswordDTO): AxiosPromise => {
    const url = UserService.baseUrl + '/account/change-password';
    return axios.post(url, dto);
  };

  public static doesEmailExist = (value: string): AxiosPromise => {
    const url = UserService.baseUrl + '/check/email-exists/' + value;
    return axios.get(url);
  };

  public static doesUsernameExist = (value: string): AxiosPromise => {
    const url = UserService.baseUrl + '/check/username-exists/' + value;
    return axios.get(url);
  };

  public static doesUsernameOrEmailExist = (value: string): AxiosPromise => {
    const url = UserService.baseUrl + '/check/username-or-email-exists/' + value;
    return axios.get(url);
  };
}
