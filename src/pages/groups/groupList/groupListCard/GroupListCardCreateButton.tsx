import React from 'react';
import PlusIcon from '../../../../components/icons/PlusIcon';
import {Group} from '../../../../models/Group';
import {useNavigate} from 'react-router-dom';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {Box, IconButton} from '@mui/material';

type GroupListCardCreateButtonProps = {
  group: Group;
};

const GroupListCardCreateButton = ({group}: GroupListCardCreateButtonProps) => {
  const navigate = useNavigate();

  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group.id));

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    goToItemCreate();
  };

  return (
    <Box color="white">
      <IconButton onClick={handleClick} color="inherit">
        <PlusIcon />
      </IconButton>
    </Box>
  );
};

export default GroupListCardCreateButton;
