import * as React from 'react';
import {FC, useEffect} from 'react';
import {Redirect, Switch, useRouteMatch} from 'react-router-dom';
import PublicRoute from '../../shared/routes/public-route';
import GroupsPreview from './groups-preview';
import GroupsSorting from './groups-sorting';
import {compose} from 'recompose';
import withFlexibleHeader from '../../shared/hocs/with-header/with-flexible-header';
import withAdditionalMenu from '../../shared/hocs/with-additional-menu/with-additional-menu';
import {Routes} from '../router';
import GroupView from './group-view';
import GroupCreate from './group-create';
import GroupEdit from './group-edit';
import withUserList from '../../shared/hocs/with-list/with-user-list';
import {useDialogsContext} from '../../shared/contexts/dialogs-context';
import {defaultGroupDeleteDialogProps, GroupDeleteDialog} from './dialogs/group-delete-dialog';
import {ItemDialogs} from '../item/_router';
import {defaultItemDeleteDialogProps, ItemDeleteDialog} from '../item/dialogs/item-delete-dialog';

export enum GroupDialogs {
  DELETE = 'GROUP_DELETE_DIALOG',
}

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
  const {handleDialog} = useDialogsContext();
  const match = useRouteMatch();

  const initDialogs = (): void => {
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
    handleDialog(ItemDialogs.DELETE, ItemDeleteDialog, defaultItemDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

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
  withUserList
)(GroupRouter);
