import * as React from 'react';
import {FC, memo, useMemo} from 'react';
import {CardContent} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {Item} from '../../../models/item.model';
import GroupPreviewCardItem from './group-preview-card-item';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {CARD_ITEMS_COUNT} from '../_constants';
import GroupPreviewCardItemSkeleton from './group-preview-card-item-skeleton';

type Props = {
  itemsToShow: Item[];
  isFirstPage: boolean;
};

const GroupPreviewCardContent: FC<Props> = ({itemsToShow, isFirstPage}: Props) => {
  const classes = groupCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = usePreviewItemListContext();

  const loading = useMemo<boolean>(() => {
    return group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
  }, [group, previewLoading]);

  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <CardContent className={classes.content}>
      {loading && indexArray.map((index) => <GroupPreviewCardItemSkeleton key={index} />)}
      {!loading && isFirstPage && <GroupPreviewCardCreateButton group={group} />}
      {!loading && itemsToShow.map((item) => <GroupPreviewCardItem item={item} key={item.id} />)}
    </CardContent>
  );
};

export default memo(GroupPreviewCardContent);
