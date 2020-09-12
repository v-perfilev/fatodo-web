import React, {FC, useState} from 'react';
import {Image} from '../../../../models/image.model';
import ImageUploaderButtonsAndPreview from './image-uploader-buttons-and-preview';
import ImageUploaderPopover from './image-uploader-popover';

type Props = {
  image: Image;
  setImage: (image: Image) => void;
  crop?: any;
}

const ImageUploader: FC<Props> = ({image, setImage, crop}: Props) => {
  const [source, setSource] = useState(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const handleClose = (image: Image): void => {
    setSource(null);
    setAnchorEl(null);
    setImage(image);
  };

  return (
    <>
      <ImageUploaderButtonsAndPreview {...{image, setImage, setSource, setAnchorEl}}  />
      <ImageUploaderPopover cropOptions={crop} image={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default ImageUploader;
