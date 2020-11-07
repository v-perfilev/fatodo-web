import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/group.model';
import {ViewState} from './types';

type GroupViewState = ViewState<Group>;

export const GroupViewContext = React.createContext<GroupViewState>(null);
export const useGroupViewContext = (): GroupViewState => useContext(GroupViewContext);
