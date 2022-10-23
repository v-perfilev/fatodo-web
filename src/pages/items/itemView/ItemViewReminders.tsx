import React from 'react';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ChipBox from '../../../components/surfaces/ChipBox';
import ReminderView from '../../../components/views/ReminderView';

const ItemViewReminders = () => {
  const {t} = useTranslation();
  const reminders = useAppSelector(ItemSelectors.reminders);

  return (
    <LabeledBox label={t('item:labels.reminders')}>
      <FHStack spacing="2">
        {reminders.map((reminder, index) => (
          <ChipBox elevation={0} key={index}>
            <ReminderView reminder={reminder} />
          </ChipBox>
        ))}
      </FHStack>
    </LabeledBox>
  );
};

export default ItemViewReminders;
