import React, {FC, useEffect, useState} from 'react';
import {Image} from '../../../../models/image.model';
import ImageUploaderButtons from './image-uploader-buttons';
import ImageUploaderCropPopover from './image-uploader-crop-popover';

type Props = {
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
  const {filenameName, contentName} = props;
  const {values, setFieldValue, uploadLabel, updateLabel, clearLabel, crop} = props;
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
