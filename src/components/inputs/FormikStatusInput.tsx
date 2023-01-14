import React from 'react';
import {FieldAttributes} from 'formik/dist/Field';
import {useTranslation} from 'react-i18next';
import FHStack from '../boxes/FHStack';
import CheckboxInput from '../controls/CheckboxInput';
import {Typography} from '@mui/material';
import {useFormikContext} from 'formik';
import FBox from '../boxes/FBox';

type FormikStatusInputProps = FieldAttributes<any>;

const FormikStatusInput = ({name}: FormikStatusInputProps) => {
  const {values, setFieldValue} = useFormikContext<any>();
  const {t} = useTranslation();

  const value = values[name];
  const toggleValue = (): void => setFieldValue(name, !value);

  return (
    <FHStack spacing={1} alignItems="center">
      <CheckboxInput isSelected={value} onClick={toggleValue} />
      <Typography fontSize="lg">
        {value && t('common:statuses.closed')}
        {!value && t('common:statuses.workInProgress')}
      </Typography>
      <FBox />
    </FHStack>
  );
};

export default FormikStatusInput;
