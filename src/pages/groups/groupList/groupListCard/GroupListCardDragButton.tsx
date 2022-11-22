import React from 'react';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import {Box, IconButton} from '@mui/material';

type GroupListCardDragButtonProps = {
  drag: any;
};

const GroupListCardDragButton = ({drag: bind}: GroupListCardDragButtonProps) => {
  return (
    <Box color="white">
      <IconButton {...bind} color="inherit">
        <ReorderIcon />
      </IconButton>
    </Box>
  );
};

export default GroupListCardDragButton;
