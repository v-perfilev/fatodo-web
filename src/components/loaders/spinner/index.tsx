import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {spinnerStyles} from './_styles';
import {Box} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement>;

export const Spinner: FC<Props> = ({className}: Props) => {
  const classes = spinnerStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <img src={'/spinner.svg'} className={classes.image} alt="Fatodo" />
    </Box>
  );
};
