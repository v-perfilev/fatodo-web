import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

const ItemFormTitle: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="title" label={t('items:fields.title.label')} required fullWidth />
  );
};

export default ItemFormTitle;
