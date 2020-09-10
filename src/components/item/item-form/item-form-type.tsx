import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemTypes} from '../../../models/item';
import {MenuItem} from '@material-ui/core';
import TypeView from '../../common/item-layouts/type-view';

const ItemFormType: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="type" label={t('items:fields.type.label')} select required fullWidth>
      {Object.values(itemTypes).map((type, index) => (
        <MenuItem value={type} key={index}>
          <TypeView type={type} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default ItemFormType;
