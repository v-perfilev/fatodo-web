import React, {FC} from 'react';
import {userInfoViewFieldStyles} from './_styles';
import {Box} from '@material-ui/core';

type Props = {
  label: string;
  text: string;
};

export const UserInfoViewField: FC<Props> = ({label, text}: Props) => {
  const classes = userInfoViewFieldStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.label}>{label}</Box>
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};
