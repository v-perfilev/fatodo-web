import React, {FC, useEffect, useState} from 'react';
import {Image} from '../../../../models/image.model';
import ImageUploaderButtons from './image-uploader-buttons';
import ImageUploaderCropPopover from './image-uploader-crop-popover';
import {Box, FormLabel} from '@material-ui/core';
import {imageUploaderStyles} from './_styles';
import ImageUploaderPreview from './image-uploader-preview';

type Props = {
  label?: string;
  required?: boolean;
  filenameName: string;
  contentName: string;
  values: any;
  setFieldValue: (field: string, value: any) => void;
  uploadLabel: string;
  updateLabel: string;
  clearLabel: string;
  crop?: any;
}

const ImageUploader: FC<Props> = (props: Props) => {
  const classes = imageUploaderStyles();
  const {filenameName, contentName} = props;
  const {label, required, values, setFieldValue, uploadLabel, updateLabel, clearLabel, crop} = props;
  const [image, setImage] = useState<Image>(null);
  const [source, setSource] = useState(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  useEffect(() => {
    if (values[filenameName] || values[contentName]) {
      setImage({filename: values[filenameName], content: values[contentName]});
    }
  }, []);

  useEffect(() => {
    setFieldValue(filenameName, image ? image.filename : null);
    setFieldValue(contentName, image ? image.content : null);
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
      <ImageUploaderPreview image={image} />
      <ImageUploaderButtons
        image={image}
        setImage={setImage}
        setSource={setSource}
        setAnchorEl={setAnchorEl}
        uploadLabel={uploadLabel}
        updateLabel={updateLabel}
        clearLabel={clearLabel}
      />
      <ImageUploaderCropPopover cropOptions={crop} image={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default ImageUploader;
