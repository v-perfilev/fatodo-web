import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsSorting from './groups-sorting/groups-sorting';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import {Routes} from '../router';
import GroupView from './group-view/group-view';
import GroupCreate from './group-create/group-create';
import GroupEdit from './group-edit/group-edit';
import {flowRight} from 'lodash';
import GroupList from './group-list/group-list';

export enum GroupRoutes {
  SORTING = '/sorting',
  CREATE = '/create',
  EDIT = '/edit/:groupId',
  VIEW = '/:groupId',
}

export class GroupRouteUtils {
  public static getSortingUrl = (): string => Routes.GROUPS + GroupRoutes.SORTING;
  public static getCreateUrl = (): string => Routes.GROUPS + GroupRoutes.CREATE;
  public static getEditUrl = (id: string): string => (Routes.GROUPS + GroupRoutes.EDIT).replace(':groupId', id);
  public static getViewUrl = (id: string): string => (Routes.GROUPS + GroupRoutes.VIEW).replace(':groupId', id);
}

const GroupRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute exact path={match.path} component={GroupList} />
      <PublicRoute path={match.path + GroupRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute path={match.path + GroupRoutes.CREATE} component={GroupCreate} />
      <PublicRoute path={match.path + GroupRoutes.EDIT} component={GroupEdit} />
      <PublicRoute path={match.path + GroupRoutes.VIEW} component={GroupView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default flowRight([withFlexibleHeader])(GroupRouter);
