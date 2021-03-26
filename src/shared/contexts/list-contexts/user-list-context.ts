import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/user.model';

export interface UserListState {
  users: User[];
  handleUserIds: (ids: string[]) => void;
}

export const UserListContext = React.createContext<UserListState>(null);
export const useUserListContext = (): UserListState => useContext(UserListContext);
