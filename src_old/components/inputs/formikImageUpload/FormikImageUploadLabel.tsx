import React from 'react';
import {Box, FormLabel} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';

type FormikImageUploadLabelProps = {
  label?: string;
};

const FormikImageUploadLabel = ({label}: FormikImageUploadLabelProps) => {
  const classes = formikImageUploadLabelStyles();

  return (
    label && (
      <Box className={classes.root}>
        <FormLabel>{label}</FormLabel>
      </Box>
    )
  );
};

const formikImageUploadLabelStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

export default FormikImageUploadLabel;
