import React from 'react';
import LogoPic from '../images/LogoPic';
import Link from '../controls/Link';
import {SxProps, Typography} from '@mui/material';

type LogoWithTextProps = {
  href: string;
};

const LogoWithText = ({href}: LogoWithTextProps) => {
  return (
    <Link sx={logoStyles} to={href}>
      <LogoPic />
      <Typography sx={textStyles}>Fatodo</Typography>
    </Link>
  );
};

const logoStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: 40,
  },
};

const textStyles: SxProps = {
  fontWeight: 500,
  fontSize: '2rem',
  lineHeight: 1,
  letterSpacing: '0.05em',
  marginLeft: 1,
};

export default LogoWithText;
