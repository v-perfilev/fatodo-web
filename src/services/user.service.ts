import axios from 'axios';

export default class UserService {
  public static getCurrentUser = (): Promise<any> => {
    return axios.get('user/user');
  };
}
