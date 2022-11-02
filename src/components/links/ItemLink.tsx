import React from 'react';
import {ItemInfo} from '../../models/Item';
import {ItemRouteUtils} from '../../routes/ItemRouter';
import Link from '../controls/Link';

type ItemLinkProps = {
  item: ItemInfo;
  color?: string;
};

export const ItemLink = ({item, color}: ItemLinkProps) => {
  const url = ItemRouteUtils.getViewUrl(item.id);

  return (
    <Link to={url} color={color}>
      {item.title}
    </Link>
  );
};

export default ItemLink;
