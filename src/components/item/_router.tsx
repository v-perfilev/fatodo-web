import * as React from 'react';
import {FC} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';

import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hoc/with-flexible-header';
import withAdditionalMenu from '../../shared/hoc/with-additional-menu';
import {Routes} from '../router';
import ItemView from './item-view';
import ItemEdit from './item-edit';
import ItemCreate from './item-create';

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

export default compose(withFlexibleHeader, withAdditionalMenu)(ItemRouter);
