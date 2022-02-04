import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Item} from '../../../models/item.model';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {AccordionDetails} from '@material-ui/core';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';
import {groupsPreviewCardContentStyles} from './_styles';
import GroupsPreviewCardItem from './groups-preview-card-item';
import GroupsPreviewItemSkeletons from './groups-preview-item-skeletons';

type Props = {
  items: Item[];
  count: number;
};

const GroupsPreviewCardContent: FC<Props> = ({items, count}: Props) => {
  const classes = groupsPreviewCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = usePreviewItemListContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const newLoading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(newLoading);
  }, [group, previewLoading]);

  return (
    <AccordionDetails className={classes.content}>
      {loading && <GroupsPreviewItemSkeletons />}
      {!loading && items.map((item) => <GroupsPreviewCardItem item={item} key={item.id} />)}
    </AccordionDetails>
  );
};

export default memo(GroupsPreviewCardContent);
