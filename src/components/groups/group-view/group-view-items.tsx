import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import Divider from '../../common/divider';
import {GradientColor} from '../../_types';
import {Item} from '../../../models/item';

type Props = {
  items: Item[];
  color: GradientColor;
}

const GroupViewItems: FC<Props> = ({items, color}: Props) => {
  const classes = groupItemListStyles();

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <Box key={index}>
          {index !== 0 && (
            <Divider color={color} />
          )}
          <GroupViewItem item={item} />
        </Box>
      ))}
    </Box>
  );
};

export default GroupViewItems;
