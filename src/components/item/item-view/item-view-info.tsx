import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {Item} from '../../../models/item.model';
import {Group} from '../../../models/group.model';
import ItemViewGroup from './item-view-group';
import ItemViewType from './item-view-type';
import ItemViewDate from './item-view-date';
import ItemViewPriority from './item-view-priority';
import {itemViewInfoStyles} from './_styles';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  item: Item;
  group: Group;
};

const ItemViewInfo: FC<Props> = ({item, group, className}: Props) => {
  const classes = itemViewInfoStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <ItemViewGroup group={group} />
      <ItemViewType type={item.type} />
      <ItemViewDate date={item.date} />
      <ItemViewPriority priority={item.priority} />
    </Box>
  );
};

export default ItemViewInfo;
