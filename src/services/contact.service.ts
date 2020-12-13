import axios, {AxiosPromise} from 'axios';
import {ContactRequestDTO} from '../models/dto/contact-request.dto';

export default class ContactService {
  private static baseUrl = '/api/contact';

  public static getAllRelations = (): AxiosPromise => {
    const url = ContactService.baseUrl + '/relation';
    return axios.get(url);
  };

  public static removeRelation = (userId: string): AxiosPromise => {
    const url = ContactService.baseUrl + '/relation/' + userId;
    return axios.delete(url);
  };

  public static getOutcomingRequests = (): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/outcoming';
    return axios.get(url);
  };

  public static getIncomingRequests = (): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/incoming';
    return axios.get(url);
  };

  public static sendRequest = (dto: ContactRequestDTO): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/send';
    return axios.post(url, dto);
  };

  public static removeRequest = (userId: string): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/remove/' + userId;
    return axios.get(url);
  };

  public static acceptRequest = (userId: string): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/accept/' + userId;
    return axios.get(url);
  };

  public static declineRequest = (userId: string): AxiosPromise => {
    const url = ContactService.baseUrl + '/requests/decline/' + userId;
    return axios.get(url);
  };
}
