import React, {FC} from 'react';
import LabeledBox from '../../common/layout-page/labeled-box';
import PageSpacer from '../../common/layout-page/page-spacer';
import {useTranslation} from 'react-i18next';
import {Reminder} from '../../../models/reminder.model';
import ReminderView from '../../common/layout-item/reminder-view';
import {Chip} from '@material-ui/core';

type Props = {
  reminders: Reminder[];
};

const ItemViewPropertiesReminders: FC<Props> = ({reminders}: Props) => {
  const {t} = useTranslation();

  const showReminders = reminders && reminders.length > 0;

  return (
    showReminders && (
      <>
        <LabeledBox label={t('items:labels.reminders')}>
          {reminders.map((reminder, index) => (
            <Chip key={index} size="medium" label={<ReminderView reminder={reminder} />} />
          ))}
        </LabeledBox>
        <PageSpacer />
      </>
    )
  );
};

export default ItemViewPropertiesReminders;
