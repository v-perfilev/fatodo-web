import * as React from 'react';
import {FC} from 'react';
import {Grid} from '@material-ui/core';
import GroupGridItem from './groups-preview-grid-item';
import {groupsPreviewGridContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import GroupsPreviewGridCreateButton from './groups-preview-grid-create-button';

const GroupsPreviewGridContainer: FC = () => {
  const classes = groupsPreviewGridContainerStyles();
  const {groups} = useGroupListContext();

  return (
    <Grid container className={classes.container}>
      {groups?.map((group) => (
        <GroupGridItem group={group} key={group.id} />
      ))}
      <GroupsPreviewGridCreateButton />
    </Grid>
  );
};

export default GroupsPreviewGridContainer;
