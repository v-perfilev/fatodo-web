import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import FormikRemindersInputPopoverToolbar from './FormikRemindersInputPopoverToolbar';
import FormikRemindersInputPopoverOnce from './FormikRemindersInputPopoverOnce';
import FormikRemindersInputPopoverWeekly from './FormikRemindersInputPopoverWeekly';
import FormikRemindersInputPopoverDaily from './FormikRemindersInputPopoverDaily';
import FormikRemindersInputPopoverMonthly from './FormikRemindersInputPopoverMonthly';
import FormikRemindersInputPopoverYearly from './FormikRemindersInputPopoverYearly';
import {Reminder, ReminderPeriodicity} from '../../../models/Reminder';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {Button, Popover, SxProps} from '@mui/material';
import FHStack from '../../boxes/FHStack';
import FVStack from '../../boxes/FVStack';

type FormikRemindersInputPopoverProps = {
  anchorEl: HTMLElement;
  handleClose: (reminder: Reminder) => void;
};

const FormikRemindersInputPopover = ({anchorEl, handleClose}: FormikRemindersInputPopoverProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('ONCE');
  const timezone = account.info.timezone;

  const isOpen = Boolean(anchorEl);

  const close = (): void => {
    handleClose(null);
  };

  const add = (): void => {
    handleClose(reminder);
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={close}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <FormikRemindersInputPopoverToolbar periodicity={periodicity} setPeriodicity={setPeriodicity} />
      <FVStack sx={containerStyles}>
        <FVStack>
          {periodicity === 'ONCE' && <FormikRemindersInputPopoverOnce setReminder={setReminder} timezone={timezone} />}
          {periodicity === 'DAILY' && (
            <FormikRemindersInputPopoverDaily setReminder={setReminder} timezone={timezone} />
          )}
          {periodicity === 'WEEKLY' && (
            <FormikRemindersInputPopoverWeekly setReminder={setReminder} timezone={timezone} />
          )}
          {periodicity === 'MONTHLY' && (
            <FormikRemindersInputPopoverMonthly setReminder={setReminder} timezone={timezone} />
          )}
          {periodicity === 'YEARLY' && (
            <FormikRemindersInputPopoverYearly setReminder={setReminder} timezone={timezone} />
          )}
        </FVStack>
        <FHStack flexGrow={0} justifyContent="flex-end">
          <Button variant="text" color="secondary" onClick={close}>
            {t('item:actions.close')}
          </Button>
          <Button variant="text" color="primary" onClick={add} disabled={!reminder}>
            {t('item:actions.add')}
          </Button>
        </FHStack>
      </FVStack>
    </Popover>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  width: 325,
  minHeight: 305,
  overflowX: 'hidden',
  padding: 2,
};

export default FormikRemindersInputPopover;
