import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';

type UserInfoViewFieldProps = {
  label: string;
  text: string;
};

const UserInfoViewField = ({label, text}: UserInfoViewFieldProps) => {
  const classes = userInfoViewFieldStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.label}>{label}</Box>
      <Box className={classes.text}>{text}</Box>
    </Box>
  );
};

const userInfoViewFieldStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  label: {
    fontSize: '0.7rem',
    color: theme.palette.grey['400'],
  },
  text: {
    fontSize: '0.8rem',
  },
}));

export default UserInfoViewField;
