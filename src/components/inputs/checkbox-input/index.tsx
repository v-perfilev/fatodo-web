import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {checkboxInputStyles} from './_styles';
import csx from 'classnames';
import {CheckIcon} from '../../icons/check-icon';

type Props = HTMLAttributes<HTMLElement> & {
  isSelected: boolean;
};

export const CheckboxInput: FC<Props> = ({onClick, className, isSelected}: Props) => {
  const classes = checkboxInputStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames} onClick={onClick}>
      {isSelected && <CheckIcon color="primary" />}
    </Box>
  );
};
