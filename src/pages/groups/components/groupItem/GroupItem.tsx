import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import GroupItemMenu from './GroupItemMenu';
import GroupItemChanges from './GroupItemChanges';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import {useNavigate} from 'react-router-dom';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import BoxWithIcon from '../../../../components/boxes/BoxWithIcon';
import AlarmIcon from '../../../../components/icons/AlarmIcon';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import TypeView from '../../../../components/views/TypeView';
import PriorityView from '../../../../components/views/PriorityView';
import StatusView from '../../../../components/views/StatusView';
import TruncatedTypography from '../../../../components/surfaces/TruncatedTypography';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {SxProps} from '@mui/material';

type GroupItemProps = {
  item: Item;
  canEdit: boolean;
};

const GroupItem = ({item, canEdit}: GroupItemProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item.id));
  const navigate = useNavigate();

  const goToItemView = (): void => navigate(ItemRouteUtils.getViewUrl(item.id));

  return (
    <FVStack sx={containerStyles} px={2} py={2} onClick={goToItemView}>
      <FHStack mr={-1} justifyContent="space-between">
        <TruncatedTypography fontSize={14}>{item.title}</TruncatedTypography>
        <GroupItemMenu item={item} canEdit={canEdit} />
      </FHStack>
      <GroupItemChanges item={item} />
      <FHStack justifyContent="space-between">
        <FHStack>
          <TypeView type={item.type} size="small" fontSize={12} color="grey.500" />
          <PriorityView priority={item.priority} size="small" fontSize={12} color="grey.500" />
          <StatusView statusType={item.status} size="small" fontSize={12} color="grey.500" />
        </FHStack>
        <FHStack justifyContent="flex-end">
          {item.remindersCount > 0 && (
            <BoxWithIcon icon={<AlarmIcon color="primary" />} size="small" fontSize={13} color="grey.500">
              {item.remindersCount}
            </BoxWithIcon>
          )}
          <BoxWithIcon icon={<CommentsIcon color="primary" />} size="small" fontSize={13} color="grey.500">
            {commentThread?.count || 0}
          </BoxWithIcon>
        </FHStack>
      </FHStack>
    </FVStack>
  );
};

const containerStyles: SxProps = {
  borderRadius: 3,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'grey.50',
  },
};

export default GroupItem;
