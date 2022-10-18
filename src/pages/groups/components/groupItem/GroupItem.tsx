import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {Group} from '../../../../models/Group';
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

type GroupItemProps = {
  item: Item;
  group: Group;
  canEdit: boolean;
};

const GroupItem = ({item, group, canEdit}: GroupItemProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item.id));
  const navigate = useNavigate();

  // const goToItemView = (): void => groupNavigation.navigate('ItemView', {group, item});
  // const goToComments = (): void =>
  //   rootNavigation.navigate('CommentList', {
  //     targetId: item.id,
  //     colorScheme: group.color,
  //   });

  return (
    <FVStack px={2} my={1}>
      <FHStack mr={-1} justifyContent="space-between">
        <TruncatedTypography fontSize={14}>{item.title}</TruncatedTypography>
        <GroupItemMenu item={item} canEdit={canEdit} />
      </FHStack>
      <GroupItemChanges item={item} />
      <FHStack justifyContent="space-between">
        <FHStack spacing={3}>
          <TypeView type={item.type} fontSize="11" color="gray.400" />
          <PriorityView priority={item.priority} fontSize="11" color="gray.400" />
          <StatusView statusType={item.status} fontSize="11" color="gray.400" />
        </FHStack>
        <FHStack justifyContent="flex-end">
          {item.remindersCount > 0 && (
            <BoxWithIcon icon={<AlarmIcon color="primary" />}>{item.remindersCount}</BoxWithIcon>
          )}
          <BoxWithIcon icon={<CommentsIcon color="primary" />}>{commentThread?.count || 0}</BoxWithIcon>
        </FHStack>
      </FHStack>
    </FVStack>
  );
};

export default GroupItem;
