import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/user.model';

type UserListContextState = ListState<User>;

export const UserListContext = React.createContext<UserListContextState>(null);
export const useUserListContext = (): UserListContextState => useContext(UserListContext);
