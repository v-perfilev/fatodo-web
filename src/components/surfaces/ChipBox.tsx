import React from 'react';
import CloseIcon from '../icons/CloseIcon';
import PaperBox from '../boxes/PaperBox';
import {IconButton, PaperProps, SxProps, Typography} from '@mui/material';
import FHStack from '../boxes/FHStack';

type ChipBoxProps = PaperProps & {
  closeAction?: () => void;
};

const ChipBox = ({children, closeAction, ...props}: ChipBoxProps) => {
  return (
    <PaperBox sx={containerStyles} {...props}>
      <FHStack>
        <Typography color="grey.700" fontWeight="bold" fontSize={12}>
          {children}
        </Typography>
        {closeAction && (
          <IconButton size="medium" onClick={closeAction}>
            <CloseIcon />
          </IconButton>
        )}
      </FHStack>
    </PaperBox>
  );
};

const containerStyles: SxProps = {
  paddingX: 2,
  paddingY: 1,
  borderRadius: 3,
  borderWidth: 0,
  backgroundColor: 'grey.100',
};

export default ChipBox;
