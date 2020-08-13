import React, {FC} from 'react';
import {Group, GroupItem} from '../_types';
import {Box} from '@material-ui/core';
import {groupItemsStyles} from './_styles';

type Props = {
  item: GroupItem;
}

const GroupItemView: FC<Props> = ({item}: Props) => {
  const classes = groupItemsStyles();

  return (
    <Box className={classes.root}>
      Test
    </Box>
  );
};

export default GroupItemView;
