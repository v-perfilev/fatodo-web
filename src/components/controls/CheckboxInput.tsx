import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import FBox from '../boxes/FBox';
import {SxProps} from '@mui/material';

type CheckboxInputProps = {
  isSelected: boolean;
  onClick?: () => void;
};

const CheckboxInput = ({isSelected, onClick}: CheckboxInputProps) => {
  return (
    <FBox sx={containerStyles} onClick={onClick}>
      {isSelected && <CheckIcon color="primary" />}
    </FBox>
  );
};

const containerStyles: SxProps = {
  flexGrow: 0,
  cursor: 'pointer',
  width: 35,
  height: 35,
  justifyContent: 'center',
  alignItems: 'center',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'secondary.main',
  borderRadius: 3,
};

export default CheckboxInput;
