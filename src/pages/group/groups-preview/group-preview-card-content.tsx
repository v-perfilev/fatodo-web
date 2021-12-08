import * as React from 'react';
import {CSSProperties, FC, memo, ReactNode, useCallback, useMemo} from 'react';
import {CardContent} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {useTrail} from 'react-spring';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {CircularSpinner} from '../../../components/loaders';
import {Item} from '../../../models/item.model';
import GroupPreviewCardItem from './group-preview-card-item';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {BUTTONS_IN_FIRST_PAGE_PREVIEW_CARD} from '../_constants';

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

  const trailItems = useMemo(() => {
    return isFirstPage ? itemsToShow?.length + BUTTONS_IN_FIRST_PAGE_PREVIEW_CARD : itemsToShow?.length;
  }, [itemsToShow, isFirstPage]);

  const itemElement = useCallback(
    (style: CSSProperties, index: number): ReactNode => (
      <div className={classes.box} key={index}>
        {!isFirstPage && <GroupPreviewCardItem item={itemsToShow[index]} style={style} />}
        {isFirstPage && index >= BUTTONS_IN_FIRST_PAGE_PREVIEW_CARD && (
          <GroupPreviewCardItem item={itemsToShow[index - BUTTONS_IN_FIRST_PAGE_PREVIEW_CARD]} style={style} />
        )}
        {isFirstPage && index < BUTTONS_IN_FIRST_PAGE_PREVIEW_CARD && (
          <GroupPreviewCardCreateButton group={group} style={style} />
        )}
      </div>
    ),
    [itemsToShow, isFirstPage, group]
  );

  const trail = useTrail(trailItems, {
    delay: 35,
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
