import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {itemViewDataStyles} from './_styles';
import {Item} from '../../../models/item.model';
import ItemViewDataPriority from './item-view-data-priority';
import ItemViewDataGroup from './item-view-data-group';
import ItemViewDataType from './item-view-data-type';
import ItemViewDataDate from './item-view-data-date';
import {Group} from '../../../models/group.model';

type Props = {
  item: Item;
};

const ItemViewData: FC<Props> = ({item}: Props) => {
  const classes = itemViewDataStyles();
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    // request group
    setGroup(null);
  }, []);

  return (
    <Box className={classes.root}>
      <ItemViewDataGroup group={group} />
      <ItemViewDataType type={item.type} />
      <ItemViewDataDate date={item.date} />
      <ItemViewDataPriority priority={item.priority} />
    </Box>
  );
};

export default ItemViewData;
