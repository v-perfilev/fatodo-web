export interface UserAccount {
  id: string;
  username: string;
  email: string;
  provider: string;
  authorities: string[];
  language: string;
}

export interface User {
  id: string;
  username: string;
  imageUrl?: string;
}
