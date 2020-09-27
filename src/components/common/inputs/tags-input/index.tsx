import React, {ChangeEvent, FC, ReactElement} from 'react';
import {Field} from 'formik';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import TextField from '@material-ui/core/TextField';

type Props = {
  name: string;
  label: string;
  options?: string[];
  handleChange?: (input: string) => void;
};

export const TagsInput: FC<Props> = ({name, label, options = [], handleChange}: Props) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (handleChange) {
      handleChange(event.target.value);
    }
  };

  return (
    <Field
      component={Autocomplete}
      name={name}
      freeSolo
      multiple
      fullWidth
      options={options}
      getOptionLabel={(option): string => option}
      renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
        <TextField {...params} label={label} onChange={onChange} />
      )}
    />
  );
};
