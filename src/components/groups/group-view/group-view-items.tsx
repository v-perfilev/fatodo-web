import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {Item} from '../../../models/item.model';
import {PageDivider} from '../../common/layouts/page-divider';

type Props = {
  groupId: string;
};

const GroupViewItems: FC<Props> = ({groupId}: Props) => {
  const classes = groupItemListStyles();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // TODO set items
  }, []);

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
