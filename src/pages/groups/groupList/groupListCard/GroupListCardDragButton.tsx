import React from 'react';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import {IconButton} from '@mui/material';

type GroupListCardDragButtonProps = {
  drag: any;
};

const GroupListCardDragButton = ({drag: bind}: GroupListCardDragButtonProps) => {
  return (
    <IconButton color="primary" {...bind}>
      <ReorderIcon />
    </IconButton>
  );
};

export default GroupListCardDragButton;
