import * as React from 'react';
import {CSSProperties, FC, memo, ReactNode} from 'react';
import {CardContent} from '@material-ui/core';
import {groupCardContentStyles} from './_styles';
import {useTrail} from 'react-spring';
import {BUTTONS_IN_GROUP_CARD} from '../_constants';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import GroupPreviewCardCreateButton from './group-preview-card-create-button';
import {CircularSpinner} from '../../../components/loaders';
import {Item} from '../../../models/item.model';
import GroupPreviewCardItem from './group-preview-card-item';

type Props = {
  itemsToShow: Item[];
  isNotFirstPage: boolean;
};

const GroupPreviewCardContent: FC<Props> = ({itemsToShow, isNotFirstPage}: Props) => {
  const classes = groupCardContentStyles();
  const {obj: group} = useGroupViewContext();
  const {loading: itemsLoading} = useItemListContext();

  const trailItems = isNotFirstPage ? itemsToShow?.length : itemsToShow?.length + BUTTONS_IN_GROUP_CARD;
  const trail = useTrail(trailItems, {
    reset: true,
    delay: 50,
    opacity: 1,
    from: {opacity: 0},
  });

  const itemElement = (style: CSSProperties, index: number): ReactNode => (
    <div className={classes.box} key={index}>
      {isNotFirstPage && <GroupPreviewCardItem item={itemsToShow[index]} style={style} />}
      {!isNotFirstPage && index >= BUTTONS_IN_GROUP_CARD && (
        <GroupPreviewCardItem item={itemsToShow[index - BUTTONS_IN_GROUP_CARD]} style={style} />
      )}
      {!isNotFirstPage && index < BUTTONS_IN_GROUP_CARD && <GroupPreviewCardCreateButton group={group} style={style} />}
    </div>
  );

  const listElement = trail.map((style: CSSProperties, index) => itemElement(style, index));

  return (
    <CardContent className={classes.content}>
      {itemsLoading && <CircularSpinner size="sm" />}
      {!itemsLoading && listElement}
    </CardContent>
  );
};

export default memo(GroupPreviewCardContent);
