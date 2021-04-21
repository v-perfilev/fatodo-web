import * as React from 'react';
import {FC, useEffect} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';

import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import ItemView from './item-view';
import ItemEdit from './item-edit';
import ItemCreate from './item-create';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import {defaultItemDeleteDialogProps, ItemDeleteDialog} from './dialogs/item-delete-dialog';
import {useDialogsContext} from '../../shared/contexts/dialogs-context';

export enum ItemDialogs {
  DELETE = 'ITEM_DELETE_DIALOG',
}

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
  const {handleDialog} = useDialogsContext();
  const match = useRouteMatch();

  const initDialogs = (): void => {
    handleDialog(ItemDialogs.DELETE, ItemDeleteDialog, defaultItemDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  return (
    <Switch>
      <PublicRoute path={match.path + ItemRoutes.CREATE} component={ItemCreate} />
      <PublicRoute path={match.path + ItemRoutes.EDIT} component={ItemEdit} />
      <PublicRoute path={match.path + ItemRoutes.VIEW} component={ItemView} />
      <Redirect to={Routes.PAGE_NOT_FOUND} />
    </Switch>
  );
};

export default compose(withFlexibleHeader, withAdditionalMenu, withUserList)(ItemRouter);
