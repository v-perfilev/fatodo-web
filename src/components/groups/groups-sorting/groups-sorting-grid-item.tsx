import * as React from 'react';
import {FC, HTMLAttributes, RefAttributes} from 'react';
import {Grid} from '@material-ui/core';
import {GroupProps} from '../_types';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import GroupSortingCard from './group-sorting-card';
import {groupSortingGridItemStyles} from './_styles';

type Props = RefAttributes<any> &
  HTMLAttributes<any> &
  GroupProps & {
    bind: (...any) => void;
  };

const GroupsSortingGridItem: FC<Props> = ({group, style, bind, ref}: Props) => {
  const classes = groupSortingGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} style={style} ref={ref}>
      <GroupSortingCard group={group} bind={bind} />
    </Grid>
  );
};

export default compose(animated)(GroupsSortingGridItem);