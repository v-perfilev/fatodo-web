import axios, {AxiosPromise} from 'axios';

export default class NotificationService {
  private static baseUrl = '/api/notification';

  public static getAllByTargetId = (targetId: string): AxiosPromise => {
    const url = NotificationService.baseUrl + '/reminders/' + targetId;
    return axios.get(url);
  };
}
