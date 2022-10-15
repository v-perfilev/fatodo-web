import React from 'react';
import {Route} from 'react-router-dom';
import PageNotFoundRedirect from './PageNotFoundRedirect';
import {RootRoutes} from './RootRouter';
import ItemCreate from '../pages/items/itemCreate/ItemCreate';
import ItemEdit from '../pages/items/itemEdit/ItemEdit';
import ItemView from '../pages/items/itemView/ItemView';

export enum ItemRoutes {
  CREATE = '/create/:groupId',
  EDIT = '/edit/:itemId',
  VIEW = '/:itemId',
}

export class ItemRouteUtils {
  public static getCreateUrl = (id: string): string => (RootRoutes.ITEMS + ItemRoutes.CREATE).replace(':groupId', id);
  public static getEditUrl = (id: string): string => (RootRoutes.ITEMS + ItemRoutes.EDIT).replace(':itemId', id);
  public static getViewUrl = (id: string): string => (RootRoutes.ITEMS + ItemRoutes.VIEW).replace(':itemId', id);
}

const ItemRouter = () => {
  return (
    <>
      <Route path={RootRoutes.ITEMS + ItemRoutes.CREATE} element={<ItemCreate />} />
      <Route path={RootRoutes.ITEMS + ItemRoutes.EDIT} element={<ItemEdit />} />
      <Route path={RootRoutes.ITEMS + ItemRoutes.VIEW} element={<ItemView />} />
      {/*Redirects*/}
      <Route path="*" element={<PageNotFoundRedirect />} />
    </>
  );
};

export default ItemRouter;
