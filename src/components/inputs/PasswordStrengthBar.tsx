import React from 'react';
import {Stack, SxProps} from '@mui/material';
import {passwordStrengthMap, passwordStrengthPostfix, passwordStrengthPrefix} from '../../shared/validators';
import FBox from '../surfaces/FBox';

type PasswordStrengthBarProps = {
  password: string;
};

const PasswordStrengthBar = ({password}: PasswordStrengthBarProps) => {
  const rulesCount = 4;
  let counter = 0;
  if (password.length >= 8) {
    counter++;
  }
  passwordStrengthMap.forEach((regexString) => {
    const regex = new RegExp(passwordStrengthPrefix + regexString + passwordStrengthPostfix);
    if (regex.exec(password)) {
      counter++;
    }
  });

  const subItems = [];
  for (let i = 0; i < counter; i++) {
    subItems.push(<FBox sx={greenStyles} key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<FBox sx={redStyles} key={i} />);
  }

  return (
    <Stack sx={containerStyles} spacing={1} direction="row">
      {subItems}
    </Stack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: 5,
};

const greenStyles: SxProps = {
  borderRadius: 3,
  backgroundColor: 'primary.main',
};

const redStyles: SxProps = {
  borderRadius: 3,
  backgroundColor: 'secondary.main',
};

export default PasswordStrengthBar;
