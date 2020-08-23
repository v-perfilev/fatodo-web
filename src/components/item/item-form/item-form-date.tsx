import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import {DateUtils} from '../../../shared/utils/date.utils';

const ItemFormDate: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={DatePicker} type="text" name="date" label={t('items:fields.date.label')}
           format={DateUtils.getDateWithYearFormat()} variant="inline" fullWidth />
  );
};

export default ItemFormDate;
