import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupItemListStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {Item} from '../../../models/item.model';
import {PageDivider} from '../../common/layouts/page-divider';
import ItemService from '../../../services/item.service';
import {Routes} from '../../router';
import {useHistory} from 'react-router-dom';

type Props = {
  groupId: string;
};

const GroupViewItems: FC<Props> = ({groupId}: Props) => {
  const classes = groupItemListStyles();
  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);

  const redirectToGroups = (): void => history.push(Routes.GROUPS);

  useEffect(() => {
    ItemService.getAllByGroupId(groupId)
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        redirectToGroups();
      });
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
