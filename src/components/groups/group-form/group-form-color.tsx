import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {MenuItem} from '@material-ui/core';
import {gradientColors} from '../../../shared/utils/color.utils';
import ColorView from '../../common/layout-group/color-view';

const GroupFormColor: FC = () => {
  const {t} = useTranslation();

  return (
    <Field component={TextField} type="text" name="color" label={t('groups:fields.color.label')} select required
           fullWidth>
      {Object.values(gradientColors).map((color, index) => (
        <MenuItem value={color} key={index}>
          <ColorView color={color} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default GroupFormColor;
