import React, {ComponentType, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Group} from '../../../models/Group';
import {ItemActions} from '../../../store/item/itemActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Item} from '../../../models/Item';

export type WithItemProps = {
  group?: Group;
  item?: Item;
  loading: boolean;
};

const withItemContainer = (Component: ComponentType<WithItemProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(ItemSelectors.group);
  const item = useAppSelector(ItemSelectors.item);
  const [loading, setLoading] = useState<boolean>(true);
  // TODO read params from route
  const route = {params: {itemId: undefined as string, item: undefined as Item, group: undefined as Group}};
  const routeItemId = route.params.itemId;
  const routeItem = route.params.item;
  const routeGroup = route.params.group;

  const goBack = (): void => {
    // TODO go back
  };

  const setGroupAndItem = (): void => {
    Promise.all([
      dispatch(ItemActions.reset()),
      dispatch(ItemActions.setGroup(routeGroup)),
      dispatch(ItemActions.setItem(routeItem)),
    ]).finally(() => setLoading(false));
  };

  const loadItem = (): void => {
    dispatch(ItemActions.fetchItemThunk(routeItemId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeGroup && routeItem && (routeGroup.id !== group?.id || routeItem.id !== item?.id)) {
      setGroupAndItem();
    } else if (routeItemId) {
      loadItem();
    } else if (!routeGroup && !routeItem && !routeItemId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Component
      loading={loading}
      group={group || routeGroup}
      item={item?.id === routeItem?.id || item?.id === routeItemId ? item : routeItem}
      {...props}
    />
  );
};

export default withItemContainer;
