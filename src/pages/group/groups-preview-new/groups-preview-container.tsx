import * as React from 'react';
import {FC} from 'react';
import {Container} from '@material-ui/core';
import {groupsPreviewContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import GroupsPreviewCard from './group-preview-card/groups-preview-card';

const GroupsPreviewContainer: FC = () => {
  const classes = groupsPreviewContainerStyles();
  const {groups} = useGroupListContext();

  return (
    <Container className={classes.container}>
      {groups?.map((group) => (
        <GroupsPreviewCard group={group} key={group.id} />
      ))}
    </Container>
  );
};

export default GroupsPreviewContainer;
