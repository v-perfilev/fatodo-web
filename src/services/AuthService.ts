import axios from '../shared/axios';
import {AxiosPromise} from 'axios';
import {LoginDTO} from '../models/dto/LoginDTO';
import {RegistrationDTO} from '../models/dto/RegistrationDTO';
import {ForgotPasswordDTO} from '../models/dto/ForgotPasswordDTO';
import {ResetPasswordDTO} from '../models/dto/ResetPasswordDTO';

export default class AuthService {
  private static baseUrl = '/api/auth';

  public static activate = (code: string): AxiosPromise<void> => {
    const url = AuthService.baseUrl + 'account/activate/' + code;
    return axios.get(url);
  };

  public static authenticate = (dto: LoginDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/authenticate';
    return axios.post(url, dto);
  };

  public static register = (dto: RegistrationDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/register';
    return axios.post(url, dto);
  };

  public static resetPassword = (dto: ResetPasswordDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + 'account/reset-password';
    return axios.post(url, dto);
  };

  public static requestActivationCode = (user: string): AxiosPromise<void> => {
    const url = AuthService.baseUrl + 'account/request-activation-code/' + user;
    return axios.get(url);
  };

  public static requestResetPasswordCode = (dto: ForgotPasswordDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/request-reset-password-code';
    return axios.post(url, dto);
  };
}
