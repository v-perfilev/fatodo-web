import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import PageDivider from '../../common/layout-page/page-divider';
import {Item} from '../../../models/item.model';

type Props = {
  items: Item[];
};

const GroupViewItems: FC<Props> = ({items}: Props) => {
  const classes = groupItemListStyles();

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <GroupViewItem item={item} />
        </Box>
      ))}
    </Box>
  );
};

export default GroupViewItems;
