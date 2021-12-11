import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {CardContent} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {Item} from '../../../models/item.model';
import GroupPreviewCardItem from './group-preview-card-item';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import GroupPreviewItemSkeletons from './group-preview-item-skeletons';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

type Props = {
  itemsToShow: Item[];
  isFirstPage: boolean;
};

const GroupPreviewCardContent: FC<Props> = ({itemsToShow, isFirstPage}: Props) => {
  const classes = groupCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = usePreviewItemListContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const newLoading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(newLoading);
  }, [group, previewLoading]);

  return (
    <CardContent className={classes.content}>
      {loading && <GroupPreviewItemSkeletons />}
      {!loading && isFirstPage && <GroupPreviewCardCreateButton group={group} />}
      {!loading && itemsToShow.map((item) => <GroupPreviewCardItem item={item} key={item.id} />)}
    </CardContent>
  );
};

export default memo(GroupPreviewCardContent);
