import React, {useCallback} from 'react';
import {CalendarReminder} from '../../../../models/Reminder';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {FilterUtils} from '../../../../shared/utils/FilterUtils';
import {useAppSelector} from '../../../../store/store';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import Bullet from '../../../../components/surfaces/Bullet';

type CalendarViewDateRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewDateReminders = ({reminders}: CalendarViewDateRemindersProps) => {
  const groupsSelector = useCallback(InfoSelectors.makeGroupsSelector(), []);
  const groupIds = reminders.map((r) => r.parentId).filter(FilterUtils.uniqueFilter);
  const groups = useAppSelector((state) => groupsSelector(state, groupIds));

  const reminderColors = reminders
    .map((reminder) => groups.find((g) => g.id === reminder.parentId))
    .filter(FilterUtils.notUndefinedFilter)
    .map((g) => g.color);

  const reminderColorsToShow = reminderColors.slice(0, 3);
  const showDots = reminderColors.length > 3;

  return (
    <FVStack spacing={1}>
      {reminderColorsToShow.map((color, index) => (
        <Bullet color={color} size={6} fullWidth key={index} />
      ))}
      {showDots && (
        <FHStack spacing={0.5} justifyContent="center">
          {Array.from({length: 3}).map((_, index) => (
            <Bullet size={6} key={index} />
          ))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default CalendarViewDateReminders;
