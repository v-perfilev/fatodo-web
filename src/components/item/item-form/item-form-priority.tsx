import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemPriorities} from '../../../models/item';
import {MenuItem} from '@material-ui/core';

const ItemFormPriority: FC = () => {
  const {t} = useTranslation();

  return (
    <Field
      component={TextField}
      type="text"
      name="priority"
      label={t('items:fields.priority.label')}
      select
      required
      fullWidth
    >
      {Object.values(itemPriorities).map((priority, index) => (
        <MenuItem value={priority} key={index}>
          {t('items:priorities.' + priority)}
        </MenuItem>
      ))}
    </Field>
  );
};

export default ItemFormPriority;
