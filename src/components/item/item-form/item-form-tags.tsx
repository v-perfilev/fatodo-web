import React, {FC, ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Field} from 'formik';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import TextField from '@material-ui/core/TextField';

const ItemFormTags: FC = () => {
  const {t} = useTranslation();

  return (
    <Field
      component={Autocomplete}
      name="tags"
      freeSolo
      multiple
      fullWidth
      options={[]}
      getOptionLabel={(option): string => option}
      renderInput={(params: AutocompleteRenderInputParams): ReactElement => (
        <TextField {...params} label={t('items:fields.tags.label')} />
      )}
    />
  );
};

export default ItemFormTags;
