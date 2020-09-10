import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import {DateFormats, DateUtils} from '../../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../common/icons/close-icon';

type Props = {
  values: any;
  setFieldValue: (field: string, value: string) => void;
};

const ItemFormDate: FC<Props> = ({values, setFieldValue}: Props) => {
  const {t} = useTranslation();

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const clear = (e): void => {
    e.stopPropagation();
    setFieldValue('date', null);
  };

  return (
    <Field
      component={DatePicker}
      type="text"
      name="date"
      label={t('items:fields.date.label')}
      format={DateFormats.dateWithYearFormat}
      variant="inline"
      fullWidth
      InputProps={{
        endAdornment: values['date'] && (
          <IconButton onClick={clear} size="small">
            <CloseIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default ItemFormDate;
