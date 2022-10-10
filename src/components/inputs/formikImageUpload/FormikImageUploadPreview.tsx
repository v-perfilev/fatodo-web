import React from 'react';
import {Box} from '@material-ui/core';
import {Image} from '../../../models/image.model';
import {makeStyles, Theme} from '@material-ui/core/styles';
import UrlPic from '../../images/UrlPic';

type FormikImageUploadPreviewProps = {
  image: Image;
  preview: boolean;
};

const FormikImageUploadPreview = ({image, preview}: FormikImageUploadPreviewProps) => {
  const classes = formikImageUploadPreviewStyles();

  return (
    image &&
    image.filename &&
    preview && (
      <Box className={classes.root}>
        <UrlPic url={image.filename} size="xl" border={3} />
      </Box>
    )
  );
};

const formikImageUploadPreviewStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
}));

export default FormikImageUploadPreview;
