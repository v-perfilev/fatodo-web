import axios from 'axios';
import { LoginDto } from '../model/dto/login.dto';

export default class UserService {
  public static getCurrentUser = (): Promise<any> => {
    return axios.get('user/user');
  };
}
