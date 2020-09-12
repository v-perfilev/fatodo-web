import React, {FC, useEffect, useState} from 'react';
import {Image} from '../../../../models/image.model';
import ImageUploaderPreviewAndButtons from './image-uploader-preview-and-buttons';
import ImageUploaderPopover from './image-uploader-popover';
import {Box, FormLabel} from '@material-ui/core';
import {imageUploaderStyles} from './_styles';

type Props = {
  label?: string;
  required?: boolean;
  name: string;
  values: any;
  setFieldValue: (field: string, value: Image) => void;
  uploadLabel: string;
  updateLabel: string;
  clearLabel: string;
  crop?: any;
}

const ImageUploader: FC<Props> = (props: Props) => {
  const classes = imageUploaderStyles();
  const {label, required, name, values, setFieldValue, uploadLabel, updateLabel, clearLabel, crop} = props;
  const [image, setImage] = useState<Image>(null);
  const [source, setSource] = useState(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  useEffect(() => {
    setImage(values[name]);
  }, []);

  useEffect(() => {
    setFieldValue(name, image);
  }, [image]);

  const handleClose = (image: Image): void => {
    setSource(null);
    setAnchorEl(null);
    setImage(image);
  };

  return (
    <>
      {label && (
        <Box className={classes.label}>
          <FormLabel required={required}>{label}</FormLabel>
        </Box>
      )}
      <ImageUploaderPreviewAndButtons
        image={image}
        setImage={setImage}
        setSource={setSource}
        setAnchorEl={setAnchorEl}
        uploadLabel={uploadLabel}
        updateLabel={updateLabel}
        clearLabel={clearLabel}
      />
      <ImageUploaderPopover cropOptions={crop} image={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default ImageUploader;
