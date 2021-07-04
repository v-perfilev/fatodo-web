import React, {FC} from 'react';
import {Box, FormLabel} from '@material-ui/core';
import {imageUploadLabelStyles} from './_styles';

type Props = {
  label?: string;
};

export const ImageUploadLabel: FC<Props> = ({label}: Props) => {
  const classes = imageUploadLabelStyles();

  return (
    label && (
      <Box className={classes.root}>
        <FormLabel>{label}</FormLabel>
      </Box>
    )
  );
};
