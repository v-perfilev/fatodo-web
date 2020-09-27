import * as React from 'react';
import {FC, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {groupSortingGridContainerStyles} from './_styles';
import withSortableGrid from '../../../shared/hoc/with-sortable-grid';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';
import {SortProps} from '../../../shared/hoc/types';
import GroupsSortingItem from './groups-sorting-item';

type Props = SortProps & {
  groups: Group[];
};

const GroupsSortingContainer: FC<Props> = (props: Props) => {
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

export default compose(animated, withSortableGrid)(GroupsSortingContainer);
