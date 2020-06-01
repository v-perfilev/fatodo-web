import * as React from 'react';
import {FC} from 'react';
import {passwordStrengthBarStyles} from './_styles';
import {passwordStrengthMap, passwordStrengthPostfix, passwordStrengthPrefix} from './_validators';
import {Box} from '@material-ui/core';

interface Props {
  password: string;
}

const PasswordStrengthBar: FC<Props> = ({password}: Props) => {
  const classes = passwordStrengthBarStyles();
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
    subItems.push(<Box className={classes.green} key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<Box className={classes.red} key={i} />);
  }

  return (
    <>
      <Box className={classes.root}>{subItems}</Box>
      <Box m={1} />
    </>
  );
};

export default PasswordStrengthBar;
