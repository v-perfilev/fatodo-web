import axios, {AxiosPromise} from 'axios';
import {LoginDTO} from '../models/dto/login.dto';
import {RegistrationDto} from '../models/dto/registration.dto';
import {ResetPasswordDTO} from '../models/dto/reset-password.dto';

export default class AccountService {
  public static authenticate = (data: LoginDTO): AxiosPromise => {
    return axios.post('auth/authenticate', data);
  };

  public static register = (data: RegistrationDto): AxiosPromise => {
    return axios.post('auth/register', data);
  };

  public static activate = (code: string): AxiosPromise => {
    return axios.get('auth/account/activate/' + code);
  };

  public static requestActivationCode = (user: string): AxiosPromise => {
    return axios.get('auth/account/request-activation-code/' + user);
  };

  public static resetPassword = (data: ResetPasswordDTO): AxiosPromise => {
    return axios.post('auth/account/reset-password', data);
  };

  public static requestResetPasswordCode = (user: string): AxiosPromise => {
    return axios.get('auth/account/request-reset-password-code/' + user);
  };
}
