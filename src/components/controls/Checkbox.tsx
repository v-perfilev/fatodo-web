import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import FBox from '../boxes/FBox';
import {SxProps} from '@mui/material';
import CircularSpinner from '../loaders/CircularSpinner';

type CheckboxInputProps = {
  checked: boolean;
  onClick?: (e: React.MouseEvent) => void;
  size?: number;
  loading?: boolean;
  canNotEdit?: boolean;
};

const Checkbox = ({checked, onClick, size = 35, loading, canNotEdit}: CheckboxInputProps) => {
  return (
    <FBox sx={containerStyles(size, canNotEdit)} onClick={onClick}>
      {!loading && checked && <CheckIcon color="primary" />}
      {loading && <CircularSpinner size={size * 0.6} color="primary" />}
    </FBox>
  );
};

const containerStyles = (size: number, canNotEdit?: boolean): SxProps => ({
  flexGrow: 0,
  cursor: 'pointer',
  width: size,
  height: size,
  justifyContent: 'center',
  alignItems: 'center',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'lightgray',
  borderRadius: 2,
  backgroundColor: canNotEdit ? 'lightgray' : undefined,
});

export default Checkbox;
