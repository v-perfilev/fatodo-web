import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TimePicker} from 'formik-material-ui-pickers';
import {DateUtils} from '../../../shared/utils/date.utils';

const ItemFormTime: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TimePicker} type="text" name="time" label={t('items:fields.time.label')}
           format={DateUtils.getTimeFormat()} ampm={false} variant="inline" fullWidth />
  );
};

export default ItemFormTime;
