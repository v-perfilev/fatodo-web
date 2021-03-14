import React, {ChangeEvent, FC, KeyboardEvent, ReactElement} from 'react';
import {Field} from 'formik';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import {TextInput} from '../text-input';

type Props = {
  name: string;
  label: string;
  options?: string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  preventEnter?: boolean;
  required?: boolean
};

export const TagsInput: FC<Props> = ({name, label, options = [], onChange, required, preventEnter = false}: Props) => {

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && preventEnter) {
      event.preventDefault();
      event.stopPropagation();
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
      onChange={onChange}
      onKeyDown={handleKeyPress}
      renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
        <TextInput name="test" {...params} label={label} required={required} onKeyDown={handleKeyPress} />
      )}
    />
  );
};
