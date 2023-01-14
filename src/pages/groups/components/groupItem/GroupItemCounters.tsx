import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import FHStack from '../../../../components/boxes/FHStack';
import BoxWithIcon from '../../../../components/boxes/BoxWithIcon';
import AlarmIcon from '../../../../components/icons/AlarmIcon';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import PriorityView from '../../../../components/views/PriorityView';

type GroupItemProps = {
  item: Item;
};

const GroupItemCounters = ({item}: GroupItemProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item.id));

  return (
    <FHStack>
      <PriorityView withoutText priority={item.priority} size="small" fontSize={12} color="grey.500" />
      {item.remindersCount > 0 && (
        <BoxWithIcon icon={<AlarmIcon color="primary" />} size="small" fontSize={13} color="grey.500">
          {item.remindersCount}
        </BoxWithIcon>
      )}
      <BoxWithIcon icon={<CommentsIcon color="primary" />} size="small" fontSize={13} color="grey.500">
        {commentThread?.count || 0}
      </BoxWithIcon>
    </FHStack>
  );
};

export default GroupItemCounters;
