import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Grid} from '@material-ui/core';
import {animated} from 'react-spring';
import {compose} from 'recompose';
import GroupSortingCard from './group-sorting-card';
import {groupSortingGridItemStyles} from './_styles';
import {Group} from '../../../models/group.model';

type Props = HTMLAttributes<any> & {
  group: Group;
  bind: (...any) => void;
  setItemRef: (element: HTMLDivElement) => void;
};

const GroupsSortingGridItem: FC<Props> = ({group, style, bind, setItemRef}: Props) => {
  const classes = groupSortingGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item} style={style} ref={setItemRef}>
      <GroupSortingCard group={group} bind={bind} />
    </Grid>
  );
};

export default compose(animated)(GroupsSortingGridItem);
