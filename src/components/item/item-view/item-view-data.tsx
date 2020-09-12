import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewDataStyles} from './_styles';
import {Item} from '../../../models/item.model';
import ItemViewDataPriority from './item-view-data-priority';
import ItemViewDataGroup from './item-view-data-group';
import ItemViewDataType from './item-view-data-type';
import ItemViewDataDate from './item-view-data-date';

type Props = {
  item: Item;
};

const ItemViewData: FC<Props> = ({item}: Props) => {
  const classes = itemViewDataStyles();

  return (
    <Box className={classes.root}>
      <ItemViewDataGroup group={item.group} />
      <ItemViewDataType type={item.type} />
      <ItemViewDataDate date={item.date} />
      <ItemViewDataPriority priority={item.priority} />
    </Box>
  );
};

export default ItemViewData;
