import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {Item} from '../../../models/item.model';
import {PageDivider} from '../../common/surfaces/page-divider';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';

type Props = {
  groupId: string;
};

const GroupViewItems: FC<Props> = ({groupId}: Props) => {
  const classes = groupViewItemsStyles();
  const {handleResponse} = useSnackContext();
  const [items, setItems] = useState<Item[]>([]);

  const loadItems = (): void => {
    ItemService.getAllByGroupId(groupId)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Box className={classes.root}>
      {items.map((item, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <GroupViewItem item={item} loadItems={loadItems} />
        </Box>
      ))}
    </Box>
  );
};

export default GroupViewItems;
