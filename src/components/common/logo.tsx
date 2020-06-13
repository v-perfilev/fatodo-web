import * as React from 'react';
import {FC} from 'react';
import {Typography} from '@material-ui/core';
import {logoStyles} from './_styles';
import {Routes} from '../router';
import Link from './link';

const Logo: FC = () => {
  const classes = logoStyles();

  return (
    <Link to={Routes.ROOT} className={classes.root} underline="none">
      <img src="/images/logo.png" className={classes.logoImage} />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};

export default Logo;
