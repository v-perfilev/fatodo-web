import React from 'react';
import {RootRoutes} from './RootRouter';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import GroupList from '../pages/groups/groupList/GroupList';
import GroupCreate from '../pages/groups/groupCreate/GroupCreate';
import GroupEdit from '../pages/groups/groupEdit/GroupEdit';
import GroupView from '../pages/groups/groupView/GroupView';

export enum GroupRoutes {
  CREATE = '/create',
  EDIT = '/edit/:groupId',
  VIEW = '/:groupId',
}

export class GroupRouteUtils {
  public static getListUrl = (): string => RootRoutes.GROUPS;
  public static getCreateUrl = (): string => RootRoutes.GROUPS + GroupRoutes.CREATE;
  public static getEditUrl = (id: string): string => (RootRoutes.GROUPS + GroupRoutes.EDIT).replace(':groupId', id);
  public static getViewUrl = (id: string): string => (RootRoutes.GROUPS + GroupRoutes.VIEW).replace(':groupId', id);
}

const GroupRouter = () => {
  return (
    <>
      <Route index element={<GroupList />} />
      <Route path={RootRoutes.GROUPS + GroupRoutes.CREATE} element={<GroupCreate />} />
      <Route path={RootRoutes.GROUPS + GroupRoutes.EDIT} element={<GroupEdit />} />
      <Route path={RootRoutes.GROUPS + GroupRoutes.VIEW} element={<GroupView />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default GroupRouter;
