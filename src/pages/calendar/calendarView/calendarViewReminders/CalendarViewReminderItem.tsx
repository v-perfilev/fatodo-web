import React, {useCallback} from 'react';
import {CalendarReminder} from '../../../../models/Reminder';
import GroupLink from '../../../../components/links/GroupLink';
import ItemLink from '../../../../components/links/ItemLink';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import FHStack from '../../../../components/boxes/FHStack';
import FVStack from '../../../../components/boxes/FVStack';
import Bullet from '../../../../components/surfaces/Bullet';
import FCenter from '../../../../components/boxes/FCenter';
import DateView from '../../../../components/views/DateView';
import {Box, Typography} from '@mui/material';

type CalendarViewReminderItemProps = {
  reminder: CalendarReminder;
};

const CalendarViewReminderItem = ({reminder}: CalendarViewReminderItemProps) => {
  const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
  const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
  const group = useAppSelector((state) => groupSelector(state, reminder.parentId));
  const item = useAppSelector((state) => itemSelector(state, reminder.targetId));

  const bulletView = <Bullet color={group?.color} size={12} />;
  const groupView = group ? <GroupLink group={group} color="grey.500" /> : null;
  const itemView = item ? <ItemLink item={item} /> : null;
  const date = new Date(reminder.date);

  return (
    <FHStack>
      <Box>
        <FCenter>{bulletView}</FCenter>
      </Box>
      <FVStack spacing={0}>
        <Typography fontSize={14} fontWeight="bold">
          {itemView}
        </Typography>
        <Typography fontSize={12} fontWeight="bold">
          {groupView}
        </Typography>
      </FVStack>
      <Typography color="grey.500" fontSize={12} whiteSpace="nowrap">
        <DateView date={date} timeFormat="FULL" />
      </Typography>
    </FHStack>
  );
};

export default CalendarViewReminderItem;
