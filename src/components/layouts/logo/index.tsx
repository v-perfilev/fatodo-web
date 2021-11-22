import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {logoStyles, logoWithTextStyles} from './_styles';
import csx from 'classnames';
import {Typography} from '@material-ui/core';
import {LogoPic} from '../../images';
import {Link} from '../../controls';

type Props = HTMLAttributes<HTMLElement> & {
  href: string;
};

export const Logo: FC<Props> = ({className, href}: Props) => {
  const classes = logoStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={href} className={classNames}>
      <LogoPic />
    </Link>
  );
};

export const LogoWithText: FC<Props> = ({className, href}: Props) => {
  const classes = logoWithTextStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={href} className={classNames}>
      <LogoPic />
      <Typography className={classes.logoText}>Fatodo</Typography>
    </Link>
  );
};
