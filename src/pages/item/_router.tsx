import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import {Routes} from '../router';
import ItemView from './item-view';
import ItemEdit from './item-edit';
import ItemCreate from './item-create';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import {flowRight} from 'lodash';

export enum ItemRoutes {
  CREATE = '/create/:groupId',
  EDIT = '/edit/:itemId',
  VIEW = '/:itemId',
}

export class ItemRouteUtils {
  public static getCreateUrl = (id: string): string => (Routes.ITEMS + ItemRoutes.CREATE).replace(':groupId', id);
  public static getEditUrl = (id: string): string => (Routes.ITEMS + ItemRoutes.EDIT).replace(':itemId', id);
  public static getViewUrl = (id: string): string => (Routes.ITEMS + ItemRoutes.VIEW).replace(':itemId', id);
}

const ItemRouter: FC = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <PublicRoute path={match.path + ItemRoutes.CREATE} component={ItemCreate} />
      <PublicRoute path={match.path + ItemRoutes.EDIT} component={ItemEdit} />
      <PublicRoute path={match.path + ItemRoutes.VIEW} component={ItemView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default flowRight([withFlexibleHeader, withUserList])(ItemRouter);
