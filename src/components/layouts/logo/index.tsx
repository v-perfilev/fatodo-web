import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Routes} from '../../../pages/router';
import {logoStyles, logoWithTextStyles} from './_styles';
import csx from 'classnames';
import {Typography} from '@material-ui/core';
import {LogoPic} from '../../images';
import {Link} from '../../controls';

type Props = HTMLAttributes<HTMLElement>;

export const Logo: FC<Props> = ({className}: Props) => {
  const classes = logoStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={Routes.ROOT} className={classNames}>
      <LogoPic />
    </Link>
  );
};

export const LogoWithText: FC<Props> = ({className}: Props) => {
  const classes = logoWithTextStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={Routes.ROOT} className={classNames}>
      <LogoPic />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};
