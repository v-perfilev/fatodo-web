import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import PaperBox from '../../common/page-layouts/paper-box';
import {ItemReminder} from '../../../models/item';
import PageSpacer from '../../common/page-layouts/page-spacer';
import {useTranslation} from 'react-i18next';

type Props = {
  reminders: ItemReminder[];
};

const ItemViewPropertiesReminders: FC<Props> = ({reminders}: Props) => {
  const {t} = useTranslation();

  const showReminders = reminders && reminders.length > 0;

  return showReminders && (
    <>
      <LabeledBox label={t('items:labels.reminders')}>
        {reminders.map((reminder, index) => {
          const text = reminder.date;
          return <PaperBox text={text} key={index} />;
        })}
      </LabeledBox>
      <PageSpacer />
    </>
  );
};

export default ItemViewPropertiesReminders;
