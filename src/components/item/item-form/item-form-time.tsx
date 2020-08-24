import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TimePicker} from 'formik-material-ui-pickers';
import {DateUtils} from '../../../shared/utils/date.utils';
import {Box, IconButton} from '@material-ui/core';
import {CloseIcon} from '../../common/icons/close-icon';
import {itemFormClearableStyles} from './_styles';

type Props = {
  values: any;
  setFieldValue: (field: string, value: string) => void;
};

const ItemFormTime: FC<Props> = ({values, setFieldValue}: Props) => {
  const classes = itemFormClearableStyles();
  const {t} = useTranslation();

  const clear = (): void => setFieldValue('time', null);

  return (
    <Box className={classes.root}>
      <Field component={TimePicker} type="text" name="time" label={t('items:fields.time.label')}
             format={DateUtils.getTimeFormat()} ampm={false} variant="inline" fullWidth />
      {values['time'] && (
        <IconButton onClick={clear} size="small" className={classes.button}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ItemFormTime;
