import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Typography} from '@material-ui/core';
import {Routes} from '../../router';
import Link from '../inputs/link';
import {logoWithTextStyles} from './_styles';
import csx from 'classnames';
import LogoPic from '../images/logo-pic';

type Props = HTMLAttributes<any>;

const LogoWithText: FC<Props> = ({className}: Props) => {
  const classes = logoWithTextStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={Routes.ROOT} className={classNames}>
      <LogoPic />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};

export default LogoWithText;
