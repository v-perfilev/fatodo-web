import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupViewMessagesStyles} from './_styles';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupViewMessages: FC<Props> = ({}: Props) => {
  const classes = groupViewMessagesStyles();

  return <Box className={classes.root}>TODO messages</Box>;
};

export default GroupViewMessages;
