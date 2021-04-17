import React, {FC, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {PageDivider} from '../../common/surfaces';
import ItemService from '../../../services/item.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {compose} from 'recompose';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';

const GroupViewItems: FC = () => {
  const classes = groupViewItemsStyles();
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const {objs: items, setObjs: setItems, setLoad: setLoadItems} = useItemListContext();

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
export default compose<{}, {}>(withItemList)(GroupViewItems);
