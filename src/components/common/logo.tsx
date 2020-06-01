import * as React from 'react';
import {FC} from 'react';
import {Link, Typography} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import {logoStyles} from './_styles';
import {Routes} from '../router';

const useStyles = logoStyles;

const Logo: FC = () => {
  const classes = useStyles();

  return (
    <Link underline="none" component={RouterLink} to={Routes.ROOT} className={classes.root}>
      <img src="/images/logo.png" className={classes.logoImage} />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};

export default Logo;
