import React from 'react';
import {SxProps} from '@mui/material';

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
    subItems.push(<Box sx={greenStyles} key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<Box sx={redStyles} key={i} />);
  }

  return <Box sx={containerStyles}>{subItems}</Box>;
};

const containerStyles: SxProps = {
  width: '100%',
  height: 4,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  '& > *': {
    flexGrow: 1,
    marginRight: 2,
    height: '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
};

const greenStyles: SxProps = {
  backgroundColor: 'primary.main',
};

const redStyles: SxProps = {
  backgroundColor: 'secondary.main',
};

export default PasswordStrengthBar;
