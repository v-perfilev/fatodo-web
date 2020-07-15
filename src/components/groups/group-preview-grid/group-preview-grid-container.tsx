import * as React from 'react';
import {FC, useEffect} from 'react';
import {groupPreviewGridContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import withSortableGrid, {SortingProps} from '../../../shared/hoc/with-sortable-grid';
import {compose} from 'recompose';
import GroupPreviewGridItem from './group-preview-grid-item';

type Props = SortingProps & {
  groups: Group[];
};

const GroupPreviewGridContainer: FC<Props> = (props: Props) => {
  const classes = groupPreviewGridContainerStyles();
  const {groups} = props;
  const {sortingRef, setSortingItems, sortingBind, sortingSprings} = props;

  useEffect(() => {
    setSortingItems(groups);
  }, [props.groups]);

  return (
    <Grid container className={classes.container} ref={sortingRef}>
      {groups.map((group, i) => (
        <GroupPreviewGridItem key={i} group={group} style={sortingSprings[i]} bind={sortingBind(i)} />
      ))}
    </Grid>
  );
};

export default compose(withSortableGrid)(GroupPreviewGridContainer);
