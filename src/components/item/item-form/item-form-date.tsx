import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import {DateUtils} from '../../../shared/utils/date.utils';
import {Box, IconButton} from '@material-ui/core';
import {CloseIcon} from '../../common/icons/close-icon';
import {itemFormClearableStyles} from './_styles';

type Props = {
  values: any;
  setFieldValue: (field: string, value: string) => void;
};

const ItemFormDate: FC<Props> = ({values, setFieldValue}: Props) => {
  const classes = itemFormClearableStyles();
  const {t} = useTranslation();

  const clear = (): void => setFieldValue('date', null);

  return (
    <Box className={classes.root}>
      <Field component={DatePicker}
             type="text"
             name="date"
             label={t('items:fields.date.label')}
             format={DateUtils.getDateWithYearFormat()}
             variant="inline"
             fullWidth
      />
      {values['date'] && (
        <IconButton onClick={clear} size="small" className={classes.button}>
          <CloseIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default ItemFormDate;
