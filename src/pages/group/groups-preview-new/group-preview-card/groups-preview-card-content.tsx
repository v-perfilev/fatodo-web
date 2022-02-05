import * as React from 'react';
import {FC, memo, useEffect} from 'react';
import {Item} from '../../../../models/item.model';
import {useGroupsPreviewListContext} from '../../../../shared/contexts/list-contexts/groups-preview-list-context';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {AccordionDetails} from '@material-ui/core';
import {useLoadingState} from '../../../../shared/hooks/use-loading-state';
import GroupsPreviewCardItem from './groups-preview-card-item';
import GroupsPreviewSkeletons from '../group-preview-skeletons/groups-preview-skeletons';
import {groupsPreviewCardContentStyles} from './_styles';

type Props = {
  items: Item[];
  count: number;
};

const GroupsPreviewCardContent: FC<Props> = ({items, count}: Props) => {
  const classes = groupsPreviewCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = useGroupsPreviewListContext();
  const [loading, setLoading] = useLoadingState();

  useEffect(() => {
    const newLoading = group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
    setLoading(newLoading);
  }, [group, previewLoading]);

  return (
    <AccordionDetails className={classes.content}>
      {loading && <GroupsPreviewSkeletons />}
      {!loading && items.map((item) => <GroupsPreviewCardItem item={item} key={item.id} />)}
    </AccordionDetails>
  );
};

export default memo(GroupsPreviewCardContent);
