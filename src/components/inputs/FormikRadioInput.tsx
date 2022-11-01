import React, {ReactElement, useMemo} from 'react';
import {FieldAttributes, useFormikContext} from 'formik';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import FHStack from '../boxes/FHStack';

type FormikTextInputProps = FieldAttributes<any> & {
  options: Map<string, string>;
};

const FormikRadioInput = ({name, label, options}: FormikTextInputProps) => {
  const {values, setFieldValue} = useFormikContext<any>();

  const value = values[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setFieldValue(name, value);
  };

  const optionElements = useMemo<ReactElement[]>(
    () =>
      Array.from(options.keys()).map((option, index) => (
        <FormControlLabel value={option} control={<Radio />} label={options.get(option)} key={index} />
      )),
    [options],
  );

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={handleChange}>
        <FHStack spacing={1}>{optionElements}</FHStack>
      </RadioGroup>
    </FormControl>
  );
};

export default FormikRadioInput;
