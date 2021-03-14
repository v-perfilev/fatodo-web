import React, {FC, KeyboardEvent, ReactElement} from 'react';
import {Field} from 'formik';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import {TextInput} from '../text-input';

type Props = {
  name: string;
  label: string;
  options?: string[];
  inputName?: string;
  preventEnter?: boolean;
  required?: boolean
};

export const TagsInput: FC<Props> = ({
                                       name,
                                       label,
                                       options = [],
                                       inputName = 'tagsInput',
                                       preventEnter = false,
                                       required
                                     }: Props) => {

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
      onKeyDown={handleKeyPress}
      renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
        <TextInput name={inputName} {...params} label={label} required={required} onKeyDown={handleKeyPress} />
      )}
    />
  );
};
