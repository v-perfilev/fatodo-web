import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupViewMessagesStyles} from './_styles';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

const GroupViewMessages: FC = () => {
  const classes = groupViewMessagesStyles();
  const {obj: group} = useGroupViewContext();

  // TODO messages
  return <Box className={classes.root}>{group.messageCount}</Box>;
};

export default GroupViewMessages;
