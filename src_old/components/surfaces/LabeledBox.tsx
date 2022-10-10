import React, {HTMLAttributes} from 'react';
import {Box, Theme, Typography} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type LabeledBoxProps = HTMLAttributes<HTMLElement> & {
  label: string;
};

const LabeledBox = ({label, children, className}: LabeledBoxProps) => {
  const classes = labeledBoxStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Typography variant="body2" className={classes.label}>
        {label}:
      </Typography>
      {children}
    </Box>
  );
};

const labeledBoxStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(2),
    },
    '& > *:first-child': {
      marginRight: theme.spacing(1.5),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  },
  label: {
    fontWeight: 500,
  },
}));

export default LabeledBox;
