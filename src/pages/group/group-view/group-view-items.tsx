import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {CircularSpinner} from '../../../components/loaders';
import GroupViewCreateButton from './group-view-create-button';
import {GroupUtils} from '../../../shared/utils/group.utils';
import {UserAccount} from '../../../models/user.model';

type Props = {
  account: UserAccount;
};

const GroupViewItems: FC<Props> = ({account}: Props) => {
  const classes = groupViewItemsStyles();
  const {obj: group} = useGroupViewContext();
  const {objs: items, loading: itemsLoading} = useItemListContext();
  const [loading, setLoading] = useState<boolean>(true);

  const canEdit = group && GroupUtils.canEdit(account, group);

  useEffect(() => {
    if (items && !itemsLoading) {
      setLoading(false);
    }
  }, [items, itemsLoading]);

  return (
    <Box className={classes.root}>
      {loading && <CircularSpinner size="sm" />}
      {!loading && <GroupViewCreateButton group={group} />}
      {!loading && items.map((item) => <GroupViewItem item={item} canEdit={canEdit} key={item.id} />)}
    </Box>
  );
};
export default GroupViewItems;
