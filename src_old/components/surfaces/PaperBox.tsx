import React, {HTMLAttributes} from 'react';
import {Paper, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type PaperBoxProps = HTMLAttributes<HTMLElement>;

const PaperBox = ({children}: PaperBoxProps) => {
  const classes = paperBoxStyles();

  return <Paper className={classes.root}>{children}</Paper>;
};

const paperBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-flex',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

export default PaperBox;
