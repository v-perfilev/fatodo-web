import React, {FC} from 'react';
import {GroupItem} from '../_types';
import {Box} from '@material-ui/core';
import {groupItemsStyles} from './_styles';
import GroupItemView from './group-item-view';

type Props = {
  items: GroupItem[];
}

const GroupItemList: FC<Props> = ({items}: Props) => {
  const classes = groupItemsStyles();

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <GroupItemView item={item} key={index} />
      ))}
    </Box>
  );
};

export default GroupItemList;
