import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupGridItem from './groups-grid-item';
import {groupGridContainerStyles} from './_styles';
import {useTrail} from 'react-spring';

interface Props {
  groups: Group[];
}

const GroupsGridContainer: FC<Props> = ({groups}: Props) => {
  const classes = groupGridContainerStyles();

  return (
    <Grid container className={classes.container}>
      {groups.map((group, i) => (
        <GroupGridItem key={i} group={group} />
      ))}
    </Grid>
  );
};

export default GroupsGridContainer;
