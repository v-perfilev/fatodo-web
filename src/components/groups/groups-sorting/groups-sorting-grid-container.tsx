import * as React from 'react';
import {FC, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupPreviewGridItem from './groups-sorting-grid-item';
import {groupSortingGridContainerStyles} from './_styles';
import withSortableGrid, {SortingProps} from '../../../shared/hoc/with-sortable-grid';
import {animated} from 'react-spring';
import {compose} from 'recompose';

type Props = SortingProps & {
  groups: Group[];
};

const GroupsSortingGridContainer: FC<Props> = (props: Props) => {
  const classes = groupSortingGridContainerStyles();
  const {groups} = props;
  const {sortingRef, setSortingItems, sortingBind, sortingSprings, sortingHeight} = props;

  useEffect(() => {
    setSortingItems(groups);
  }, [groups]);

  const gridStyle = {height: sortingHeight};

  return (
    <Grid container className={classes.container} style={gridStyle} ref={sortingRef}>
      {groups.map((group, i) => (
        <GroupPreviewGridItem key={i} group={group} style={sortingSprings[i]} bind={sortingBind(i)} />
      ))}
    </Grid>
  );
};

export default compose(animated, withSortableGrid)(GroupsSortingGridContainer);
