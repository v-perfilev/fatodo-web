import axios from 'axios';
import {LoginDTO} from '../models/dto/login.dto';
import {RegisterDTO} from '../models/dto/register.dto';
import {ResetPasswordDTO} from '../models/dto/reset-password.dto';

export default class AccountService {
  public static authenticate = (data: LoginDTO): Promise<any> => {
    return axios.post('auth/authenticate', data);
  };

  public static register = (data: RegisterDTO): Promise<any> => {
    return axios.post('auth/register', data);
  };

  public static activate = (code: string): Promise<any> => {
    return axios.get('auth/account/activate/' + code);
  };

  public static requestActivationCode = (user: string): Promise<any> => {
    return axios.get('auth/account/request-activation-code/' + user);
  };

  public static requestResetPasswordCode = (user: string): Promise<Account> => {
    return axios.get('auth/account/request-reset-password-code/' + user);
  };

  public static resetPassword = (data: ResetPasswordDTO): Promise<any> => {
    return axios.post('auth/account/reset-password', data);
  };

}
