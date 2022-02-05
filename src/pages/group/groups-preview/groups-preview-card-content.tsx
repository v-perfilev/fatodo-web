import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {CardContent} from '@material-ui/core';
import {groupsPreviewCardContentStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupsPreviewCardCreateButton from './groups-preview-card-create-button';
import {Item} from '../../../models/item.model';
import GroupsPreviewCardItem from './groups-preview-card-item';
import {useGroupListItemsContext} from '../../../shared/contexts/list-contexts/group-list-items-context';
import GroupsPreviewItemSkeletons from './groups-preview-item-skeletons';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

type Props = {
  itemsToShow: Item[];
  isFirstPage: boolean;
};

const GroupsPreviewCardContent: FC<Props> = ({itemsToShow, isFirstPage}: Props) => {
  const classes = groupsPreviewCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = useGroupListItemsContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const newLoading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(newLoading);
  }, [group, previewLoading]);

  return (
    <CardContent className={classes.content}>
      {loading && <GroupsPreviewItemSkeletons />}
      {!loading && isFirstPage && <GroupsPreviewCardCreateButton group={group} />}
      {!loading && itemsToShow.map((item) => <GroupsPreviewCardItem item={item} key={item.id} />)}
    </CardContent>
  );
};

export default memo(GroupsPreviewCardContent);
