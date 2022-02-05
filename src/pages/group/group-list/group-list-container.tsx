import * as React from 'react';
import {FC} from 'react';
import {Container} from '@material-ui/core';
import {groupListContainerStyles} from './_styles';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import GroupsPreviewCard from './group-list-card/group-list-card';

const GroupListContainer: FC = () => {
  const classes = groupListContainerStyles();
  const {groups} = useGroupListContext();

  return (
    <Container className={classes.container}>
      {groups?.map((group) => (
        <GroupsPreviewCard group={group} key={group.id} />
      ))}
    </Container>
  );
};

export default GroupListContainer;
