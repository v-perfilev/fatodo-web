import React, {FC, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {PageDivider} from '../../common/surfaces/page-divider';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';
import {compose} from 'recompose';
import withItemList from '../../../shared/hoc/with-item-list';
import {useItemListContext} from '../../../shared/contexts/item-list-context';

const GroupViewItems: FC = () => {
  const classes = groupViewItemsStyles();
  const {handleResponse} = useSnackContext();
  const {group} = useGroupViewContext();
  const {items, setItems, setLoadItems} = useItemListContext();

  const loadItems = (): void => {
    ItemService.getAllByGroupId(group.id)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    loadItems();
    setLoadItems(() => (): void => loadItems());
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

export default compose(withItemList)(GroupViewItems);
