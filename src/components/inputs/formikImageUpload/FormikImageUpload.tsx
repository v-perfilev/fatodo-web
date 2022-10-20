import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import FormikImageUploadLabel from './FormikImageUploadLabel';
import FormikImageUploadPreview from './FormikImageUploadPreview';
import FormikImageUploadButtons from './FormikImageUploadButtons';
import FormikImageUploadPopover from './FormikImageUploadPopover';
import {Image} from '../../../models/Image';

type FormikImageUploadProps = {
  filenameName: string;
  contentName: string;
  label?: string;
  crop?: any;
  preview?: boolean;
};

const FormikImageUpload = ({filenameName, contentName, label, crop, preview = false}: FormikImageUploadProps) => {
  const {values, setFieldValue} = useFormikContext<any>();
  const [image, setImage] = useState<Image>(null);
  const [source, setSource] = useState<string>(null);
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
      <FormikImageUploadLabel label={label} />
      <FormikImageUploadPreview image={image} preview={preview} />
      <FormikImageUploadButtons image={image} setImage={setImage} setSource={setSource} setAnchorEl={setAnchorEl} />
      <FormikImageUploadPopover cropOptions={crop} source={source} anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
};

export default FormikImageUpload;
