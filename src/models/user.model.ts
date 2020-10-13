export interface UserAccount {
  id: string;
  username: string;
  email: string;
  provider: string;
  authorities: string[];
  language: string;
  imageFilename?: string;
}

export interface User {
  id: string;
  username: string;
  imageFilename?: string;
}
