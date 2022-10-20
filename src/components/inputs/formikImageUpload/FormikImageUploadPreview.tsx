import React from 'react';
import UrlPic from '../../images/UrlPic';
import {Box} from '@mui/material';
import {Image} from '../../../models/Image';

type FormikImageUploadPreviewProps = {
  image: Image;
  preview: boolean;
};

const FormikImageUploadPreview = ({image, preview}: FormikImageUploadPreviewProps) => {
  return (
    image &&
    image.filename &&
    preview && (
      <Box marginBottom={1}>
        <UrlPic url={image.filename} size={170} borderWidth={3} />
      </Box>
    )
  );
};

export default FormikImageUploadPreview;
