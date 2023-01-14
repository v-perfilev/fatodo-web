import React from 'react';
import {Item} from '../../../../models/Item';
import {useNavigate} from 'react-router-dom';
import FHStack from '../../../../components/boxes/FHStack';
import TruncatedTypography from '../../../../components/surfaces/TruncatedTypography';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {SxProps} from '@mui/material';
import GroupItemDoneCheckbox from './GroupItemDoneCheckbox';
import FBox from '../../../../components/boxes/FBox';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemDate from './GroupItemDate';
import GroupItemCounters from './GroupItemCounters';

type GroupItemProps = {
  item: Item;
  canEdit: boolean;
};

const GroupItem = ({item, canEdit}: GroupItemProps) => {
  const navigate = useNavigate();

  const goToItemView = (): void => navigate(ItemRouteUtils.getViewUrl(item.id));

  return (
    <FHStack sx={containerStyles} spacing={2} onClick={goToItemView}>
      <GroupItemDoneCheckbox item={item} canEdit={canEdit} />
      <FBox alignItems="center">
        <TruncatedTypography fontSize={16}>{item.title}</TruncatedTypography>
      </FBox>
      <FVStack height="100%" justifyContent="space-between" alignItems="flex-end" spacing={2} py="0.5">
        <GroupItemDate item={item} />
        <GroupItemCounters item={item} />
      </FVStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  padding: 2,
  borderRadius: 3,
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'grey.50',
  },
};

export default GroupItem;
