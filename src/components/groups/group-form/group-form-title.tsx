import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

const GroupFormTitle: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="title" label={t('groups:fields.title.label')} required fullWidth />
  );
};

export default GroupFormTitle;