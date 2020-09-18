import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Routes} from '../../router';
import Link from '../inputs/link';
import {logoStyles} from './_styles';
import csx from 'classnames';
import LogoPic from '../images/logo-pic';

type Props = HTMLAttributes<any>;

const Logo: FC<Props> = ({className}: Props) => {
  const classes = logoStyles();
  const classNames = csx(classes.root, className);

  return (
    <Link to={Routes.ROOT} className={classNames}>
      <LogoPic />
    </Link>
  );
};

export default Logo;
