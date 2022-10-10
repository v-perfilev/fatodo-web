import React from 'react';
import {Box, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type PageDividerProps = {
  height?: number;
};

const PageDivider = ({height}: PageDividerProps) => {
  const classes = pageDividerStyles();

  const style = {height: !!height ? height : 1};

  return <Box className={classes.root} style={style} />;
};

const pageDividerStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 1,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    background: theme.palette.gradient,
  },
}));

export default PageDivider;
