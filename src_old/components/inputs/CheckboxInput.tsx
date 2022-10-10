import React, {HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import CheckIcon from '../icons/CheckIcon';
import {makeStyles, Theme} from '@material-ui/core/styles';

type CheckboxInputProps = HTMLAttributes<HTMLElement> & {
  isSelected: boolean;
};

const CheckboxInput = ({onClick, className, isSelected}: CheckboxInputProps) => {
  const classes = checkboxInputStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames} onClick={onClick}>
      {isSelected && <CheckIcon color="primary" />}
    </Box>
  );
};

const checkboxInputStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey['500'],
    borderRadius: 5,
  },
}));

export default CheckboxInput;
