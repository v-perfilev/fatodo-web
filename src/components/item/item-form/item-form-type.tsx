import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemTypes} from '../../../models/item';
import {MenuItem} from '@material-ui/core';

const ItemFormType: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="type" label={t('items:fields.type.label')} select required
           fullWidth>
      {Object.values(itemTypes).map((type, index) => (
        <MenuItem value={type} key={index}>{t('items:types.' + type)}</MenuItem>
      ))}
    </Field>
  );
};

export default ItemFormType;
