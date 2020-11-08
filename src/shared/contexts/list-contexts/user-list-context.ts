import * as React from 'react';
import {useContext} from 'react';
import {ContactRelation} from '../../../models/contact-relation.model';

type UserListContextState = ListState<ContactRelation>;

export const UserListContext = React.createContext<UserListContextState>(null);
export const useUserListContext = (): UserListContextState => useContext(UserListContext);
