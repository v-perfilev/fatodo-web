import * as React from 'react';
import {CSSProperties, FC, memo, ReactNode, useCallback, useMemo} from 'react';
import {CardContent} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {useTrail} from 'react-spring';
import {BUTTONS_IN_GROUP_CARD} from '../_constants';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {CircularSpinner} from '../../../components/loaders';
import {Item} from '../../../models/item.model';
import GroupPreviewCardItem from './group-preview-card-item';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';

type Props = {
  itemsToShow: Item[];
  isNotFirstPage: boolean;
};

const GroupPreviewCardContent: FC<Props> = ({itemsToShow, isNotFirstPage}: Props) => {
  const classes = groupCardContentStyles();
  const {group} = useGroupViewContext();
  const {loading: previewLoading} = usePreviewItemListContext();

  const loading = useMemo<boolean>(() => {
    return group && previewLoading.has(group.id) ? previewLoading.get(group.id) : false;
  }, [group, previewLoading]);

  const trailItems = useMemo(() => {
    return isNotFirstPage ? itemsToShow?.length : itemsToShow?.length + BUTTONS_IN_GROUP_CARD;
  }, [itemsToShow, isNotFirstPage]);

  const itemElement = useCallback(
    (style: CSSProperties, index: number): ReactNode => (
      <div className={classes.box} key={index}>
        {isNotFirstPage && <GroupPreviewCardItem item={itemsToShow[index]} style={style} />}
        {!isNotFirstPage && index >= BUTTONS_IN_GROUP_CARD && (
          <GroupPreviewCardItem item={itemsToShow[index - BUTTONS_IN_GROUP_CARD]} style={style} />
        )}
        {!isNotFirstPage && index < BUTTONS_IN_GROUP_CARD && (
          <GroupPreviewCardCreateButton group={group} style={style} />
        )}
      </div>
    ),
    [itemsToShow, isNotFirstPage, group]
  );

  const trail = useTrail(trailItems, {
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <CardContent className={classes.content}>
      {loading && <CircularSpinner size="sm" />}
      {!loading && trail.map((style: CSSProperties, index) => itemElement(style, index))}
    </CardContent>
  );
};

export default memo(GroupPreviewCardContent);
