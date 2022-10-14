import React from 'react';
import {SxProps} from '@mui/material';
import LogoPic from './LogoPic';
import Link from '../controls/Link';

type LogoProps = {
  href: string;
};

const Logo = ({href}: LogoProps) => {
  return (
    <Link sx={logoStyles} to={href}>
      <LogoPic />
    </Link>
  );
};

const logoStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: 50,
  },
};

export default Logo;
