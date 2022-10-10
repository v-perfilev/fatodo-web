import React, {HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

type SpinnerProps = HTMLAttributes<HTMLElement>;

const Spinner = ({className}: SpinnerProps) => {
  const classes = spinnerStyles();

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <img src={'/spinner.svg'} className={classes.image} alt="Fatodo" />
    </Box>
  );
};

const spinnerStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
  },
  image: {
    width: 270,
    height: 270,
    maxWidth: '70%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default Spinner;
