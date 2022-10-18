import React from 'react';
import ReorderIcon from '../../../../components/icons/ReorderIcon';
import {IconButton} from '@mui/material';

type GroupListCardDragButtonProps = {
  drag: () => void;
};

const GroupListCardDragButton = ({drag}: GroupListCardDragButtonProps) => {
  return (
    <IconButton onDrag={drag}>
      <ReorderIcon />
    </IconButton>
  );
};

export default GroupListCardDragButton;
