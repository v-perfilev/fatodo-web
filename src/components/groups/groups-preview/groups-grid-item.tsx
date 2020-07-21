import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import {GroupProps} from '../_types';
import GroupCard from './group-card';
import {groupGridItemStyles} from './_styles';

type Props = GroupProps;

const GroupsGridItem: FC<Props> = ({group}: Props) => {
  const classes = groupGridItemStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.item}>
      <GroupCard group={group} />
    </Grid>
  );
};

export default GroupsGridItem;
