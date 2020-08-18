import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import PaperBox from '../../common/page-layouts/paper-box';
import PageSpacer from '../../common/page-layouts/page-spacer';
import {useTranslation} from 'react-i18next';
import {Reminder} from '../../../models/reminder';

type Props = {
  reminders: Reminder[];
};

const ItemViewPropertiesReminders: FC<Props> = ({reminders}: Props) => {
  const {t} = useTranslation();

  const showReminders = reminders && reminders.length > 0;

  return showReminders && (
    <>
      <LabeledBox label={t('items:labels.reminders')}>
        {reminders.map((reminder, index) => (
          <PaperBox key={index}>{reminder.periodicity}</PaperBox>
        ))}
      </LabeledBox>
      <PageSpacer />
    </>
  );
};

export default ItemViewPropertiesReminders;
