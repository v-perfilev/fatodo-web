import * as React from 'react';
import {HTMLAttributes} from 'react';
import csx from 'classnames';
import {Theme, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LogoPic from '../images/LogoPic';
import Link from '../controls/Link';

type LogoWithTextProps = HTMLAttributes<HTMLElement> & {
  href: string;
};

const LogoWithText = ({className, href}: LogoWithTextProps) => {
  const classes = logoWithTextStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={href} className={classNames}>
      <LogoPic />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};

const logoWithTextStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 50,
    },
  },
  logoText: {
    fontWeight: 500,
    fontSize: '2.2rem',
    lineHeight: 1,
    letterSpacing: '0.05em',
    marginLeft: theme.spacing(1),
  },
}));

export default LogoWithText;
