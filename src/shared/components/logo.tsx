import * as React from 'react';
import {FC} from 'react';
import {logoStyles} from './_styles';
import {Routes} from '../../components/router';
import Link from './link';

const Logo: FC = () => {
  const classes = logoStyles();

  return (
    <Link to={Routes.ROOT} className={classes.root} underline="none">
      <img src="/images/logo.png" className={classes.logoImage} />
    </Link>
  );
};

export default Logo;
