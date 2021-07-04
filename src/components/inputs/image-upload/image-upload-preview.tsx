import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {imageUploadPreviewStyles} from './_styles';
import {Image} from '../../../models/image.model';
import {UrlPic} from '../../images/url-pic';

type Props = {
  image: Image;
  preview: boolean;
};

export const ImageUploadPreview: FC<Props> = ({image, preview}: Props) => {
  const classes = imageUploadPreviewStyles();

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
