import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Group} from '../../../models/Group';
import {ItemActions} from '../../../store/item/itemActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Item} from '../../../models/Item';
import {useNavigate, useParams} from 'react-router-dom';
import {useDelayedState} from '../../hooks/useDelayedState';
import {GroupRouteUtils} from '../../../routes/GroupRouter';

export type WithItemProps = {
  group?: Group;
  item?: Item;
  loading: boolean;
};

const withItemContainer = (Component: ComponentType<WithItemProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(ItemSelectors.group);
  const item = useAppSelector(ItemSelectors.item);
  const {itemId} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useDelayedState(itemId !== item?.id || group?.id !== item?.id);

  const canLoad = itemId !== item?.id || group?.id !== item?.groupId;
  const wrongRoute = !itemId;
  const loadingFinished = itemId === item?.id && group?.id === item?.groupId;

  const goBack = (): void => navigate(-1);
  const goToGroups = (): void => navigate(GroupRouteUtils.getListUrl());
  const goToGroup = (): void => navigate(GroupRouteUtils.getViewUrl(group?.id));

  const loadItem = (): void => {
    dispatch(ItemActions.fetchItemThunk(itemId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (canLoad) {
      loadItem();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  useEffect(() => {
    if (!group && !loading) {
      goToGroups();
    } else if (!item && !loading) {
      goToGroup();
    }
  }, [group, item]);

  return <Component loading={loading || !loadingFinished} group={group} item={item} {...props} />;
};

export default withItemContainer;
