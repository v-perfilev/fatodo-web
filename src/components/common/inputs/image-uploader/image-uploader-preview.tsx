import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {imageUploaderPreview} from './_styles';
import {Image} from '../../../../models/image.model';
import RoundPic from '../../images/round-pic';
import {ImageUtils} from '../../../../shared/utils/image.utils';

type Props = {
  image: Image;
};

const ImageUploaderPreview: FC<Props> = ({image}: Props) => {
  const classes = imageUploaderPreview();

  return image && (
    <Box className={classes.image}>
      <RoundPic url={ImageUtils.getImage(image.filename)} size="big" />
    </Box>
  );
};

export default ImageUploaderPreview;