import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {groupMessagesStyles} from './_styles';
import {Group} from '../../../models/group';

type Props = {
  group: Group;
}

const GroupViewMessages: FC<Props> = ({group}: Props) => {
  const classes = groupMessagesStyles();

  return (
    <Box className={classes.root}>
      Test
    </Box>
  );
};

export default GroupViewMessages;
