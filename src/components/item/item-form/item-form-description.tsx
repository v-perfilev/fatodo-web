import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

const ItemFormDescription: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="description" label={t('items:fields.description.label')}
           multiline fullWidth rows={15} />
  );
};

export default ItemFormDescription;
