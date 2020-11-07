import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/group.model';
import {DeleteState} from './types';

type GroupDeleteState = DeleteState<Group>;

export const GroupDeleteContext = React.createContext<GroupDeleteState>(null);
export const useGroupDeleteContext = (): GroupDeleteState => useContext(GroupDeleteContext);
