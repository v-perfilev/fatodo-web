import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import PageDivider from '../../common/layout-page/page-divider';
import {GradientColor} from '../../../shared/utils/color.utils';
import {ItemModel} from '../../../models/item.model';

type Props = {
  items: ItemModel[];
  color: GradientColor;
};

const GroupViewItems: FC<Props> = ({items, color}: Props) => {
  const classes = groupItemListStyles();

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider color={color} />}
          <GroupViewItem item={item} />
        </Box>
      ))}
    </Box>
  );
};

export default GroupViewItems;
