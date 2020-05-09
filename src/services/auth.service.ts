import axios from 'axios';
import {LoginDto} from '../model/dto/login.dto';
import {RegisterDto} from '../model/dto/register.dto';

export default class AuthService {
  public static authenticate = (data: LoginDto): Promise<any> => {
    return axios.post('auth/authenticate', data);
  };

  public static register = (data: RegisterDto): Promise<any> => {
    return axios.post('auth/register', data);
  };

  public static activate = (code: string): Promise<any> => {
    return axios.get('auth/activation/activate/' + code);
  };

}
