import React, {FC, memo} from 'react';
import {Box} from '@material-ui/core';
import {chatContentItemDateStyles} from './_styles';

type Props = {
  date: string;
};

const ChatContentItemDate: FC<Props> = ({date}: Props) => {
  const classes = chatContentItemDateStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.topLine} />
      <Box className={classes.date}>{date}</Box>
      <Box className={classes.bottomLine} />
    </Box>
  );
};

export default memo(ChatContentItemDate);
