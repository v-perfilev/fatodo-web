import React, {FC, memo} from 'react';
import {Box} from '@material-ui/core';
import {chatContentDateStyles} from './_styles';

type Props = {
  date: string;
};

const ChatContentDate: FC<Props> = ({date}: Props) => {
  const classes = chatContentDateStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.topLine} />
      <Box className={classes.date}>{date}</Box>
      <Box className={classes.bottomLine} />
    </Box>
  );
};

export default memo(ChatContentDate);
