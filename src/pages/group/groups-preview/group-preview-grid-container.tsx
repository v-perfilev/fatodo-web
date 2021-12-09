import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import GroupGridItem from './group-preview-grid-item';
import {groupGridContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import GroupPreviewGridCreateButton from './group-preview-grid-create-button';

const GroupPreviewGridContainer: FC = () => {
  const classes = groupGridContainerStyles();
  const {groups} = useGroupListContext();

  return (
    <Grid container className={classes.container}>
      {groups?.map((group) => (
        <GroupGridItem group={group} key={group.id} />
      ))}
      <GroupPreviewGridCreateButton />
    </Grid>
  );
};

export default GroupPreviewGridContainer;
