import * as React from 'react';
import {FC} from 'react';
import {spinnerStyles} from './_styles';

const useStyles = spinnerStyles;

const Spinner: FC = () => {
  const classes = useStyles();

  return <img src="/spinner.svg" className={classes.root} alt="Fatodo" />;
};

export default Spinner;
