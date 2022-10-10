import * as React from 'react';
import {FC, memo, MutableRefObject, useEffect} from 'react';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {SortProps} from '../../../shared/hocs/with-sortable-grid/types';
import {groupListContainerStyles} from './_styles';
import GroupListItem from './group-list-item';

type Props = SortProps & {
  sorting: boolean;
  setOrder: (order: MutableRefObject<number[]>) => void;
};

const GroupListContainer: FC<Props> = (props: Props) => {
  const classes = groupListContainerStyles();
  const {groups} = useGroupListContext();
  const {setSortItems, setSortContainerRef, setSortItemRef} = props;
  const {sortContainerHeight, sortSprings, sortBind, sortOrder} = props;
  const {sorting, setOrder} = props;

  const containerStyle = sorting ? {minHeight: sortContainerHeight} : {};

  useEffect(() => {
    setOrder(sortOrder);
  }, []);

  useEffect(() => {
    setSortItems(groups);
  }, [groups]);

  return (
    <div className={classes.sortingBox} style={containerStyle} ref={setSortContainerRef}>
      {groups.map((group, i) => (
        <GroupListItem
          group={group}
          sorting={sorting}
          style={sortSprings[i]}
          bind={sortBind(i)}
          setItemRef={setSortItemRef}
          key={group.id}
        />
      ))}
    </div>
  );
};

export default memo(GroupListContainer);
