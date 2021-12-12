import * as React from 'react';
import {FC, MutableRefObject, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {groupsSortingGridContainerStyles} from './_styles';
import withSortableGrid from '../../../shared/hocs/with-sortable-grid/with-sortable-grid';
import {animated} from 'react-spring';
import {SortProps} from '../../../shared/hocs/with-sortable-grid/types';
import GroupsSortingItem from './groups-sorting-grid-item';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {flowRight} from 'lodash';

type BaseProps = {
  setOrder: (order: MutableRefObject<number[]>) => void;
};

type Props = SortProps & BaseProps;

const GroupsSortingGridContainer: FC<Props> = (props: Props) => {
  const classes = groupsSortingGridContainerStyles();
  const {groups} = useGroupListContext();
  const {setSortItems, setSortContainerRef, setSortItemRef} = props;
  const {sortContainerHeight, sortSprings, sortBind, sortOrder} = props;
  const {setOrder} = props;

  const gridStyle = {minHeight: sortContainerHeight};

  useEffect(() => {
    setOrder(sortOrder);
  }, []);

  useEffect(() => {
    setSortItems(groups);
  }, [groups]);

  return (
    <Grid container className={classes.container} style={gridStyle} ref={setSortContainerRef}>
      {groups.map((group, i) => {
        return (
          <GroupsSortingItem
            key={i}
            group={group}
            style={sortSprings[i]}
            bind={sortBind(i)}
            setItemRef={setSortItemRef}
          />
        );
      })}
    </Grid>
  );
};

export default flowRight([animated, withSortableGrid])(GroupsSortingGridContainer);