import React from 'react';
import {SxProps, Typography} from '@mui/material';
import FBox from '../../boxes/FBox';

type PermissionSelectItemProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const PermissionSelectItem = ({title, active, onClick}: PermissionSelectItemProps) => {
  return (
    <FBox sx={containerStyles(active)} onClick={onClick}>
      <Typography color={active ? 'primary' : 'grey.400'}>{title}</Typography>
    </FBox>
  );
};

const containerStyles = (active: boolean): SxProps => ({
  cursor: 'pointer',
  paddingX: 2,
  paddingY: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: active ? 'primary' : 'grey.400',
  borderRadius: 3,
});

export default PermissionSelectItem;
