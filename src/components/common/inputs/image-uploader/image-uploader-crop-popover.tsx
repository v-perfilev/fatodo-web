import React, {FC, useRef, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {Image} from '../../../../models/image.model';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import {imageUploaderPopoverStyles} from './_styles';
import {Notification} from '../../../../shared/notification/notification';
import {IMAGE_MAX_SIZE, IMAGE_MAX_WIDTH, IMAGE_MIN_WIDTH} from '../../../../constants';
import {ImageError} from './types';
import csx from 'classnames';

type Props = {
  source: File;
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
  maxWidthOrHeight: IMAGE_MAX_WIDTH,
  maxSizeMB: IMAGE_MAX_SIZE,
};

const minWidth = IMAGE_MIN_WIDTH;

const ImageUploaderCropPopover: FC<Props> = ({source, anchorEl, handleClose, cropOptions}: Props) => {
  const classes = imageUploaderPopoverStyles();
  const imageRef = useRef();
  const [crop, setCrop] = useState({...defaultInitialCrop, ...cropOptions});
  const [croppedBlob, setCroppedBlob] = useState<Blob>(null);
  const [isValid, setIsValid] = useState(true);
  const [notificationAllowed, setNotificationAllowed] = useState(true);

  const isOpen = Boolean(anchorEl);

  const classNames = csx(classes.popoverBody, {[classes.invalidBody]: !isValid});

  const onClose = (): void => {
    if (!isValid) {
      handleClose(null);
    } else {
      imageCompression(croppedBlob, compressionOptions).then((compressedBlob: Blob) => {
        const image = {filename: URL.createObjectURL(compressedBlob), content: compressedBlob};
        handleClose(image);
      });
    }
    setCrop({...defaultInitialCrop, ...cropOptions});
  };

  const onImageLoad = (image): void => {
    imageRef.current = image;
  };

  const sendErrorNotifications = (errors: ImageError[]): void => {
    if (notificationAllowed && errors.length > 0) {
      errors.forEach((error) => {
        Notification.handleSnack('image.' + error, 'warning');
      });
      setNotificationAllowed(false);
      setTimeout(() => setNotificationAllowed(true), 5000);
    }
  };

  const onCropChange = (crop): void => {
    const errors: ImageError[] = [];
    if (crop.width < minWidth || crop.height < minWidth) {
      errors.push('tooSmall');
    }
    sendErrorNotifications(errors);
    setIsValid(errors.length === 0);
    setCrop(crop);
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
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob: Blob) => {
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
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

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Box className={classNames}>
        <ReactCrop
          src={source}
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

export default ImageUploaderCropPopover;
