import React, {FC, useState} from 'react';
import {Image} from '../../../../models/image.model';
import ImageUploaderButtons from './image-uploader-buttons';
import ImageUploaderCropPopover from './image-uploader-crop-popover';

type Props = {
  image: Image;
  setImage: (image: Image) => void;
  uploadLabel: string;
  updateLabel: string;
  clearLabel: string;
  crop?: any;
};

const ImageUploader: FC<Props> = (props: Props) => {
  const {uploadLabel, updateLabel, clearLabel, crop} = props;
  const [image, setImage] = useState<Image>(null);
  const [source, setSource] = useState(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const handleClose = (image: Image): void => {
    setSource(null);
    setAnchorEl(null);
    setImage(image);
  };

  return (
    <>
      <ImageUploaderButtons
        image={image}
        setImage={setImage}
        setSource={setSource}
        setAnchorEl={setAnchorEl}
        uploadLabel={uploadLabel}
        updateLabel={updateLabel}
        clearLabel={clearLabel}
      />
      <ImageUploaderCropPopover cropOptions={crop} source={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default ImageUploader;
