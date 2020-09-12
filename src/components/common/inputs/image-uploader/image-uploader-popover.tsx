import React, {FC, useRef, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {Image} from '../../../../models/image.model';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import {imageUploaderPopoverStyles} from './_styles';

type Props = {
  image: File;
  anchorEl: HTMLElement;
  handleClose: (image: Image) => void;
  cropOptions?: any;
};

const defaultInitialCrop = {
  unit: '%',
  width: 100,
  aspect: 1,
};

const compressionOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 500,
};

const ImageUploaderPopover: FC<Props> = ({image, anchorEl, handleClose, cropOptions}: Props) => {
  const classes = imageUploaderPopoverStyles();
  const imageRef = useRef();
  const [crop, setCrop] = useState({...defaultInitialCrop, ...cropOptions});
  const [croppedBlob, setCroppedBlob] = useState<Blob>(null);

  const isOpen = Boolean(anchorEl);

  const onClose = (): void => {
    imageCompression(croppedBlob, compressionOptions).then((compressedBlob: Blob) => {
      const image = {url: URL.createObjectURL(compressedBlob), compressedBlob} as Image;
      handleClose(image);
    });
  };

  const onImageLoad = (image): void => {
    imageRef.current = image;
  };

  const onCropChange = (crop): void => {
    setCrop(crop);
  };

  const onCropComplete = (crop): void => {
    if (imageRef.current && crop.width && crop.height) {
      getCroppedImg(imageRef.current, crop).then((croppedImage) => {
        setCroppedBlob(croppedImage);
      });
    } else {
      setCroppedBlob(null);
    }
  };

  const getCroppedImg = (img, crop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => {
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Box className={classes.popoverBody}>
        <ReactCrop
          src={image}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoad}
          onChange={onCropChange}
          onComplete={onCropComplete}
        />
      </Box>
    </Popover>
  );
};

export default ImageUploaderPopover;
