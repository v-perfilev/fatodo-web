import axios from 'axios';

interface ILoginData {
  username: string;
  password: string;
}

export default class AuthService {

  public static authenticate = (data: ILoginData): Promise<any> => {
    console.log('axios');
    return axios.post('api/auth/authenticate', data);
  };

}
