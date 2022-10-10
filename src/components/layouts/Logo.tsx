import * as React from 'react';
import {HTMLAttributes} from 'react';
import csx from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import Link from '../controls/Link';
import LogoPic from '../images/LogoPic';

type LogoProps = HTMLAttributes<HTMLElement> & {
  href: string;
};

const Logo = ({className, href}: LogoProps) => {
  const classes = logoStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={href} className={classNames}>
      <LogoPic />
    </Link>
  );
};

const logoStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 50,
    },
  },
}));

export default Logo;
