import * as React from 'react';
import {FC} from 'react';
import {groupContainerStyles} from './_styles';
import {Grid} from '@material-ui/core';
import {Group} from '../_types';
import GroupItem from './group-item';

interface Props {
  groups: Group[];
  mode
}

const GroupContainer: FC<Props> = ({groups, mode}: Props) => {
  const classes = groupContainerStyles();

  return (
    <Grid container className={classes.container}>
      {groups.map((group, index) => (
        <GroupItem key={index} group={group} mode={mode} />
      ))}
    </Grid>
  );
};

export default GroupContainer;
