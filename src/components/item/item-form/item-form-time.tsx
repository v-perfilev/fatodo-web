import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TimePicker} from 'formik-material-ui-pickers';
import {DateFormats} from '../../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../common/icons/close-icon';

type Props = {
  values: any;
  setFieldValue: (field: string, value: string) => void;
};

const ItemFormTime: FC<Props> = ({values, setFieldValue}: Props) => {
  const {t} = useTranslation();

  const clear = (e): void => {
    e.stopPropagation();
    setFieldValue('time', null);
  };

  return (
    <Field component={TimePicker}
           type="text"
           name="time"
           label={t('items:fields.time.label')}
           format={DateFormats.timeFormat}
           ampm={false}
           variant="inline"
           fullWidth
           InputProps={{
             endAdornment: values['time'] && (
               <IconButton onClick={clear} size="small">
                 <CloseIcon />
               </IconButton>
             ),
           }}
    />
  );
};

export default ItemFormTime;
