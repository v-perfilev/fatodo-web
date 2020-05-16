import * as React from 'react';
import {FC} from 'react';
import {Link, Typography} from '@material-ui/core';
import {logoStyles} from './_styles';

const useStyles = logoStyles;

const Logo: FC = () => {
  const classes = useStyles();

  const preventDefault = (event): void => event.preventDefault();

  return (
    <Link href="#" onClick={preventDefault} className={classes.root}>
      <img src="/images/logo_small.png" className={classes.logoImage} />
      <Typography variant="h1" className={classes.logoText}>
        Fatodo
      </Typography>
    </Link>
  );
};

export default Logo;
