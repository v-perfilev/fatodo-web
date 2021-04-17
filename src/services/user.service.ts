import axios, {AxiosPromise} from 'axios';
import {ChangePasswordDTO} from '../models/dto/change-password.dto';
import {User, UserAccount} from '../models/user.model';

export default class UserService {
  private static baseUrl = '/api/user';

  public static getAllByIds = (ids: string[]): AxiosPromise<User[]> => {
    const url = UserService.baseUrl + '/user/all-by-ids';
    return axios.post(url, ids);
  };

  public static getAllByUsernamePart = (usernamePart: string): AxiosPromise<User[]> => {
    const url = UserService.baseUrl + '/user/all-by-username/' + usernamePart;
    return axios.get(url);
  };

  public static getByUsername = (username: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user/username/' + username;
    return axios.get(url);
  };

  public static getByUsernameOrEmail = (user: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user/username-or-email/' + user;
    return axios.get(url);
  };

  public static getCurrent = (): AxiosPromise<UserAccount> => {
    const url = UserService.baseUrl + '/account/current';
    return axios.get(url);
  };

  public static updateAccount = (formData: FormData): AxiosPromise<void> => {
    const url = UserService.baseUrl + '/account/update';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.post(url, formData, config);
  };

  public static changePassword = (dto: ChangePasswordDTO): AxiosPromise<void> => {
    const url = UserService.baseUrl + '/account/change-password';
    return axios.post(url, dto);
  };

  public static doesEmailExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/email-exists/' + value;
    return axios.get(url);
  };

  public static doesUsernameExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/username-exists/' + value;
    return axios.get(url);
  };

  public static doesUsernameOrEmailExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/username-or-email-exists/' + value;
    return axios.get(url);
  };
}
