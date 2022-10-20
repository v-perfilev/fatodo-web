import React from 'react';
import {Box, FormLabel} from '@mui/material';

type FormikImageUploadLabelProps = {
  label?: string;
};

const FormikImageUploadLabel = ({label}: FormikImageUploadLabelProps) => {
  return (
    label && (
      <Box marginBottom={1}>
        <FormLabel>{label}</FormLabel>
      </Box>
    )
  );
};

export default FormikImageUploadLabel;
