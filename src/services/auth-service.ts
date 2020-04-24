import axios from 'axios';
import { LoginDTO } from '../model/dto/login-dto';

export default class AuthService {
  public static authenticate = (data: LoginDTO): Promise<any> => {
    return axios.post('auth/authenticate', data);
  };
}
