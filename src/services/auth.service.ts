import axios, {AxiosPromise} from 'axios';
import {LoginDTO} from '../models/dto/login.dto';
import {RegistrationDto} from '../models/dto/registration.dto';
import {ResetPasswordDTO} from '../models/dto/reset-password.dto';
import {ForgotPasswordDTO} from '../models/dto/forgot-password.dto';

export default class AuthService {
  private static baseUrl = '/api/auth/';

  public static authenticate = (data: LoginDTO): AxiosPromise => {
    const url = AuthService.baseUrl + 'authenticate';
    return axios.post(url, data);
  };

  public static register = (data: RegistrationDto): AxiosPromise => {
    const url = AuthService.baseUrl + 'register';
    return axios.post(url, data);
  };

  public static activate = (code: string): AxiosPromise => {
    const url = AuthService.baseUrl + 'account/activate/' + code;
    return axios.get(url);
  };

  public static requestActivationCode = (user: string): AxiosPromise => {
    const url = AuthService.baseUrl + 'account/request-activation-code/' + user;
    return axios.get(url);
  };

  public static resetPassword = (data: ResetPasswordDTO): AxiosPromise => {
    const url = AuthService.baseUrl + 'account/reset-password';
    return axios.post(url, data);
  };

  public static requestResetPasswordCode = (data: ForgotPasswordDTO): AxiosPromise => {
    const url = AuthService.baseUrl + 'account/request-reset-password-code';
    return axios.post(url, data);
  };
}