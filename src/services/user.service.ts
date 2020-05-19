import axios from 'axios';
import User from '../models/user.model';

export default class UserService {
  public static getCurrentUser = async (): Promise<User> => {
    let result = null;
    await axios.get('user/user').then((response) => (result = response.data));
    return result;
  };

  public static isEmailUnique = async (value: string): Promise<boolean> => {
    let result = null;
    await axios.get('user/check/email/' + value + '/unique').then((response) => (result = response.data));
    return result;
  };

  public static isUsernameUnique = async (value: string): Promise<boolean> => {
    let result = null;
    await axios.get('user/check/username/' + value + '/unique').then((response) => (result = response.data));
    return result;
  };
}
