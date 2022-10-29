import React, {memo, ReactElement} from 'react';
import {SxProps} from '@mui/material';
import FBox from '../boxes/FBox';

type IconPicProps = {
  icon: ReactElement;
  size?: number;
};

const IconPic = ({icon, size = 50}: IconPicProps) => {
  const iconElement = React.cloneElement(icon, {size: '70%', color: 'primary'});

  return <FBox sx={containerStyles(size)}>{iconElement}</FBox>;
};

const containerStyles = (size: number): SxProps => ({
  position: 'relative',
  width: size,
  height: size,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'background.default',
  borderSize: 1,
  borderColor: 'primary',
  borderRadius: 10,
});

export default memo(IconPic);
