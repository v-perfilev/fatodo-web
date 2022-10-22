import React, {MouseEvent, ReactNode, useMemo} from 'react';
import {useFormikContext} from 'formik';
import CloseIcon from '../icons/CloseIcon';
import moment, {Moment} from 'moment';
import {FieldAttributes} from 'formik/dist/Field';
import {IconButton, TextField} from '@mui/material';
import {DateUtils} from '../../shared/utils/DateUtils';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {UserAccount} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {DatePicker, TimePicker} from '@mui/x-date-pickers';
import {TextFieldProps as MuiTextFieldPropsType} from '@mui/material/TextField/TextField';
import FHStack from '../boxes/FHStack';

type FormikDateTimePickerMode = 'date' | 'time';

type FormikDateInputProps = FieldAttributes<any> & {
  mode: FormikDateTimePickerMode;
};

const formatValue = (date: Date, account: UserAccount, mode: FormikDateTimePickerMode): string => {
  switch (mode) {
    case 'date':
      return DateFormatters.formatDate(date, account, undefined, 'FULL');
    case 'time':
      return DateFormatters.formatDate(date, account, 'FULL');
  }
};

const FormikDateInput = ({name, label, mode}: FormikDateInputProps) => {
  const {values, setFieldValue} = useFormikContext<any>();
  const account = useAppSelector(AuthSelectors.account);
  const ampm = account.info.timeFormat === 'H12';

  const value = values[name];
  const momentValue = moment(value);

  const formattedValue = useMemo<string>(() => {
    return value ? formatValue(value, account, mode) : undefined;
  }, [value]);

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const clear = (e: MouseEvent): void => {
    e.stopPropagation();
    setFieldValue(name, null);
  };

  const onChange = (moment: Moment): void => {
    const date = DateUtils.getDateFromMoment(moment);
    setFieldValue(name, date);
  };

  const endAdornment = (button: ReactNode) => (
    <FHStack spacing={0.5} mx={0.5}>
      {value && (
        <IconButton onClick={clear} size="small">
          <CloseIcon />
        </IconButton>
      )}
      {button}
    </FHStack>
  );

  const renderInput = (params: MuiTextFieldPropsType) => {
    return (
      <TextField
        label={label}
        value={formattedValue || ''}
        inputRef={params.inputRef}
        InputProps={{readOnly: true, endAdornment: endAdornment(params.InputProps.endAdornment)}}
        fullWidth
      />
    );
  };

  return mode === 'time' ? (
    <TimePicker ampm={ampm} onChange={onChange} value={momentValue} renderInput={renderInput} />
  ) : (
    <DatePicker onChange={onChange} value={momentValue} renderInput={renderInput} />
  );
};

export default FormikDateInput;
