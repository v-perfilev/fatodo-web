export default interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  authorities: string[];
}
