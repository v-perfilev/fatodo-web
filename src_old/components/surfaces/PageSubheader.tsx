import React, {ReactNode} from 'react';
import {Box, Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type PageSubheaderProps = {
  title: ReactNode;
};

const PageSubheader = ({title}: PageSubheaderProps) => {
  const classes = pageSubheaderStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightMedium">{title}</Box>
      </Typography>
    </Box>
  );
};

const pageSubheaderStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default PageSubheader;
