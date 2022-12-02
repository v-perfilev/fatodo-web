import React from 'react';
import {ItemInfo} from '../../models/Item';
import {ItemRouteUtils} from '../../routes/ItemRouter';
import Link from '../controls/Link';

type ItemLinkProps = {
  item: ItemInfo;
  color?: string;
  noLink?: boolean;
};

export const ItemLink = ({item, color, noLink}: ItemLinkProps) => {
  const url = ItemRouteUtils.getViewUrl(item.id);

  return noLink ? (
    <>{item.title}</>
  ) : (
    <Link to={url} color={color}>
      {item.title}
    </Link>
  );
};

export default ItemLink;
