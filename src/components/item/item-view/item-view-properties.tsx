import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {itemViewPropertiesStyles} from './_styles';
import {Item} from '../../../models/item';
import ItemViewPropertiesTags from './item-view-properties-tags';
import ItemViewPropertiesReminders from './item-view-properties-reminders';
import ItemViewPropertiesChanges from './item-view-properties-changes';

type Props = {
  item: Item
};

const ItemViewProperties: FC<Props> = ({item}: Props) => {
  const classes = itemViewPropertiesStyles();

  return (
    <Box className={classes.root}>
      <ItemViewPropertiesReminders reminders={item.reminders} />
      <ItemViewPropertiesTags tags={item.tags} />
      <ItemViewPropertiesChanges item={item} />
    </Box>
  );
};

export default ItemViewProperties;
