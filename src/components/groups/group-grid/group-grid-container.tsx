import * as React from 'react';
import {FC} from 'react';
import {groupGridContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupGridItem from './group-grid-item';

interface Props {
  groups: Group[];
}

const GroupGridContainer: FC<Props> = ({groups}: Props) => {
  const classes = groupGridContainerStyles();

  return (
    <Grid container className={classes.container}>
      {groups.map((group, i) =>
        <GroupGridItem key={i} group={group} />,
      )}
    </Grid>
  );
};

export default GroupGridContainer;
