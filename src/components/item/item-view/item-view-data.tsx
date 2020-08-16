import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewDataStyles} from './_styles';
import {Item} from '../../../models/item';
import ItemViewDataPriority from './item-view-data-priority';
import ItemViewDataGroup from './item-view-data-group';
import ItemViewDataType from './item-view-data-type';

type Props = {
  item: Item
};

const ItemViewData: FC<Props> = ({item}: Props) => {
  const classes = itemViewDataStyles();

  return (
    <Box className={classes.root}>
      <ItemViewDataGroup group={item.group} />
      <ItemViewDataType type={item.type} />
      <ItemViewDataPriority priority={item.priority} />
    </Box>
  );
};

export default ItemViewData;
