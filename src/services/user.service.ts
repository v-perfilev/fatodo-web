import axios, {AxiosPromise} from 'axios';

export default class UserService {
  public static getCurrentUser = (): AxiosPromise => {
    return axios.get('user/user');
  };

  public static isEmailUnique = (value: string): AxiosPromise => {
    return axios.get('user/check/email/' + value + '/unique');
  };

  public static isUsernameUnique = (value: string): AxiosPromise => {
    return axios.get('user/check/username/' + value + '/unique');
  };
}
