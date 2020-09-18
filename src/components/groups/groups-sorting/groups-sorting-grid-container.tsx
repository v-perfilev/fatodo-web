import * as React from 'react';
import {FC, useEffect, useRef} from 'react';
import {Grid} from '@material-ui/core';
import GroupPreviewGridItem from './groups-sorting-grid-item';
import {groupSortingGridContainerStyles} from './_styles';
import withSortableGrid, {SortProps} from '../../../shared/hoc/with-sortable-grid';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';

type Props = SortProps & {
  groups: Group[];
};

const GroupsSortingGridContainer: FC<Props> = (props: Props) => {
  const classes = groupSortingGridContainerStyles();
  const {groups} = props;
  const {setSortItems, setSortContainerRef, setSortItemRef, sortContainerHeight, sortSprings, sortBind} = props;

  const gridStyle = {minHeight: sortContainerHeight};

  useEffect(() => {
    setSortItems(groups);
  }, [groups]);

  return (
    <Grid container className={classes.container} style={gridStyle} ref={setSortContainerRef}>
      {groups.map((group, i) => {
        return (
          <GroupPreviewGridItem key={i} group={group} style={sortSprings[i]} bind={sortBind(i)}
                                setItemRef={setSortItemRef} />
        );
      })}
    </Grid>
  );
};

export default compose(animated, withSortableGrid)(GroupsSortingGridContainer);
