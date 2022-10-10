import React, {useState} from 'react';
import {Box, Button, Popover} from '@material-ui/core';
import {Reminder, ReminderPeriodicity} from '../../../models/reminder.model';
import {flowRight} from 'lodash';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';
import FormikRemindersInputPopoverToolbar from './FormikRemindersInputPopoverToolbar';
import FormikRemindersInputPopoverOnce from './FormikRemindersInputPopoverOnce';
import FormikRemindersInputPopoverWeekly from './FormikRemindersInputPopoverWeekly';
import FormikRemindersInputPopoverDaily from './FormikRemindersInputPopoverDaily';
import FormikRemindersInputPopoverMonthly from './FormikRemindersInputPopoverMonthly';
import FormikRemindersInputPopoverYearly from './FormikRemindersInputPopoverYearly';

type FormikRemindersInputPopoverProps = AuthState & {
  anchorEl: HTMLElement;
  handleClose: (reminder: Reminder) => void;
};

const FormikRemindersInputPopover = ({anchorEl, handleClose, account}: FormikRemindersInputPopoverProps) => {
  const classes = formikRemindersInputPopoverStyles();
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
      <Box className={classes.popoverBody}>
        {periodicity === 'ONCE' && <FormikRemindersInputPopoverOnce setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'DAILY' && <FormikRemindersInputPopoverDaily setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'WEEKLY' && (
          <FormikRemindersInputPopoverWeekly setReminder={setReminder} timezone={timezone} />
        )}
        {periodicity === 'MONTHLY' && (
          <FormikRemindersInputPopoverMonthly setReminder={setReminder} timezone={timezone} />
        )}
        {periodicity === 'YEARLY' && (
          <FormikRemindersInputPopoverYearly setReminder={setReminder} timezone={timezone} />
        )}
        <Box className={classes.buttons}>
          <Button variant="text" color="primary" onClick={add} disabled={!reminder}>
            {t('item:tooltips.add')}
          </Button>
          <Button variant="text" color="secondary" onClick={close}>
            {t('item:tooltips.close')}
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

const formikRemindersInputPopoverStyles = makeStyles((theme: Theme) => ({
  popoverBody: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 325,
    minWidth: 310,
    minHeight: 305,
    overflowX: 'hidden',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));

export default flowRight([withAuthState])(FormikRemindersInputPopover);
