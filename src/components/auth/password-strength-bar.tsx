import * as React from 'react';
import {FC} from 'react';
import {passwordStrengthBarStyles} from './_styles';
import {passwordStrengthMap, passwordStrengthPostfix, passwordStrengthPrefix} from './_validators';

const useStyles = passwordStrengthBarStyles;

interface Props {
  password: string;
}

export const PasswordStrengthBar: FC<Props> = ({password}: Props) => {
  const classes = useStyles();
  const rulesCount = 4;
  let counter = 0;
  if (password.length >= 8) {
    counter++;
  }
  passwordStrengthMap.forEach(regexString => {
    const regex = new RegExp(passwordStrengthPrefix + regexString + passwordStrengthPostfix);
    if (regex.exec(password)) {
      counter++;
    }
  });

  const subItems = [];
  for (let i = 0; i < counter; i++) {
    subItems.push(<div className={classes.green} key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<div className={classes.red} key={i} />);
  }

  return (
    <div className={classes.root}>
      {subItems}
    </div>
  );
};
