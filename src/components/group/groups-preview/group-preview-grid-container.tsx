import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import GroupGridItem from './group-preview-grid-item';
import {groupGridContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/group-list-context';

const GroupPreviewGridContainer: FC = () => {
  const classes = groupGridContainerStyles();
  const {groups} = useGroupListContext();

  return (
    <Grid container className={classes.container}>
      {groups.map((group, i) => (
        <GroupGridItem key={i} group={group} />
      ))}
    </Grid>
  );
};

export default GroupPreviewGridContainer;
