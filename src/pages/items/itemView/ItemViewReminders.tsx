import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ChipBox from '../../../components/surfaces/ChipBox';
import ReminderView from '../../../components/views/ReminderView';
import {Box, SxProps} from '@mui/material';
import FBox from '../../../components/boxes/FBox';

const ItemViewReminders = () => {
  const {t} = useTranslation();
  const reminders = useAppSelector(ItemSelectors.reminders);

  return (
    <LabeledBox label={t('item:labels.reminders')}>
      <Box>
        <FBox sx={chipContainerStyles}>
          {reminders.map((reminder, index) => (
            <ChipBox elevation={0} key={index}>
              <ReminderView reminder={reminder} />
            </ChipBox>
          ))}
        </FBox>
      </Box>
    </LabeledBox>
  );
};

const chipContainerStyles: SxProps = {
  flexWrap: 'wrap',
  margin: -0.5,
};

export default ItemViewReminders;
