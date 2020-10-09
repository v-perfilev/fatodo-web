import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview';
import GroupsSorting from './groups-sorting';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import GroupView from './group-view';
import GroupCreate from './group-create';
import GroupEdit from './group-edit';
import withItemDeleteDialog from '../../shared/hoc/with-item-delete-dialog';
import withGroupDeleteDialog from '../../shared/hoc/with-group-delete-dialog';

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
      <PublicRoute exact path={match.path} component={GroupsPreview} />
      <PublicRoute path={match.path + GroupRoutes.SORTING} component={GroupsSorting} />
      <PublicRoute path={match.path + GroupRoutes.CREATE} component={GroupCreate} />
      <PublicRoute path={match.path + GroupRoutes.EDIT} component={GroupEdit} />
      <PublicRoute path={match.path + GroupRoutes.VIEW} component={GroupView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(
  withFlexibleHeader,
  withAdditionalMenu,
  withGroupDeleteDialog,
  withItemDeleteDialog
)(GroupRouter);
