import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {colorSchemes} from '../../../../shared/theme/colors';
import {MenuItem} from '@material-ui/core';
import ThemeView from '../../views/theme-view';

export const ThemeSelect: FC = () => {
  const {t} = useTranslation();

  return (
    <Field
      component={TextField}
      type="text"
      name="color"
      label={t('groups:fields.color.label')}
      select
      required
      fullWidth
    >
      {Object.values(colorSchemes).map((color, index) => (
        <MenuItem value={color} key={index}>
          <ThemeView color={color} />
        </MenuItem>
      ))}
    </Field>
  );
};
