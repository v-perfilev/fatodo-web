import React, {FC, useEffect, useState} from 'react';
import {Image} from '../../../models/image.model';
import {ImageUploadButtons} from './image-upload-buttons';
import {ImageUploadPopover} from './image-upload-popover';
import {useFormikContext} from 'formik';
import {ImageUploadLabel} from './image-upload-label';
import {ImageUploadPreview} from './image-upload-preview';

type Props = {
  filenameName: string;
  contentName: string;
  label?: string;
  crop?: any;
  preview?: boolean;
};

export const ImageUpload: FC<Props> = ({filenameName, contentName, label, crop, preview = false}: Props) => {
  const {values, setFieldValue} = useFormikContext();
  const [image, setImage] = useState<Image>(null);
  const [source, setSource] = useState<string | ArrayBuffer>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const handleClose = (image: Image): void => {
    setSource(null);
    setAnchorEl(null);
    setImage(image);
  };

  useEffect(() => {
    if (values[filenameName]) {
      const image = {filename: values[filenameName], content: values[contentName]};
      setImage(image);
    }
  }, []);

  useEffect(() => {
    setFieldValue(filenameName, image?.filename);
    setFieldValue(contentName, image?.content);
  }, [image]);

  return (
    <>
      <ImageUploadLabel label={label} />
      <ImageUploadPreview image={image} preview={preview} />
      <ImageUploadButtons image={image} setImage={setImage} setSource={setSource} setAnchorEl={setAnchorEl} />
      <ImageUploadPopover cropOptions={crop} source={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};
