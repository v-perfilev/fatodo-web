import React, {HTMLAttributes} from 'react';
import {Box, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type PageHeader = HTMLAttributes<HTMLElement>;

const PageHeader = ({children}: PageHeader) => {
  const classes = pageHeaderStyles();

  return <Box className={classes.root}>{children}</Box>;
};

const pageHeaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1.5),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
}));

export default PageHeader;
