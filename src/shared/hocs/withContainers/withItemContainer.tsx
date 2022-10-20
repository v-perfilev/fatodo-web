import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Group} from '../../../models/Group';
import {ItemActions} from '../../../store/item/itemActions';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Item} from '../../../models/Item';
import {useNavigate, useParams} from 'react-router-dom';

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

  const canLoad = itemId !== item?.id;
  const wrongRoute = !itemId;
  const loadingFinished = itemId === item?.id;

  const goBack = (): void => navigate(-1);

  const loadItem = (): void => {
    dispatch(ItemActions.fetchItemThunk(itemId))
      .unwrap()
      .catch(() => goBack());
  };

  useEffect(() => {
    if (canLoad) {
      loadItem();
    } else if (wrongRoute) {
      goBack();
    }
  }, []);

  return <Component loading={!loadingFinished} group={group} item={item} {...props} />;
};

export default withItemContainer;
