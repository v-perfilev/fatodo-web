import axios from 'axios';
import {LoginDto} from '../model/dto/login.dto';

export default class AuthService {
  public static authenticate = (data: LoginDto): Promise<any> => {
    return axios.post('auth/authenticate', data);
  };
}
