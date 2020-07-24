import * as React from 'react';
import {FC} from 'react';
import {Typography} from '@material-ui/core';
import {logoWithTextStyles} from './_styles';
import {Routes} from '../../components/router';
import Link from './link';

const LogoWithText: FC = () => {
  const classes = logoWithTextStyles();

  return (
    <Link to={Routes.ROOT} className={classes.root} underline="none">
      <img src="/images/logo.png" className={classes.logoImage} />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};

export default LogoWithText;
