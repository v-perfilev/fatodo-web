import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {imageUploadPreviewStyles} from './_styles';
import {Image} from '../../../../models/image.model';
import {RoundPic} from '../../images/round-pic';

type Props = {
  image: Image;
  preview: boolean;
};

export const ImageUploadPreview: FC<Props> = ({image, preview}: Props) => {
  const classes = imageUploadPreviewStyles();

  return (image.filename && preview) && (
    <Box className={classes.root}>
      <RoundPic url={image.filename} size="lg" border={3} />
    </Box>
  );
};
