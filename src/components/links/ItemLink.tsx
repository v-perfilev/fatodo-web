import React from 'react';
import {ItemInfo} from '../../models/Item';
import {ItemRouteUtils} from '../../routes/ItemRouter';
import Link from '../controls/Link';

type ItemLinkProps = {
  item: ItemInfo;
};

export const ItemLink = ({item}: ItemLinkProps) => {
  const url = ItemRouteUtils.getViewUrl(item.id);

  return <Link to={url}>{item.title}</Link>;
};

export default ItemLink;
