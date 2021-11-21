import React, {FC, memo, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {PageDivider} from '../../../components/surfaces';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {flowRight} from 'lodash';
import {CircularSpinner} from '../../../components/loaders';
import GroupViewCreateButton from './group-view-create-button';

const GroupViewItems: FC = () => {
  const classes = groupViewItemsStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const {objs: items, setObjs: setItems, setLoad: setLoadItems} = useItemListContext();
  const [loading, setLoading] = useState(true);

  const loadItems = (): void => {
    setLoading(true);
    ItemService.getAllItemsByGroupId(group.id)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoadItems(() => (): void => loadItems());
  }, []);

  return (
    <Box className={classes.root}>
      {loading && <CircularSpinner size="sm" />}
      {!loading &&
        items.map((item, index) => (
          <Box key={index}>
            {index !== 0 && <PageDivider />}
            <GroupViewItem item={item} />
          </Box>
        ))}
      {!loading && items.length !== 0 && <PageDivider />}
      {!loading && <GroupViewCreateButton group={group} />}
    </Box>
  );
};
export default flowRight([withItemList, memo])(GroupViewItems);
