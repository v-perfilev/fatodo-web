import React, {useRef, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import {Image} from '../../../models/Image';
import {Box, Popover, SxProps} from '@mui/material';
import {useAppDispatch} from '../../../store/store';
import {SnackActions} from '../../../store/snack/snackActions';

type FormikImageUploadPopoverProps = {
  source: string;
  anchorEl: HTMLElement;
  handleClose: (image: Image) => void;
  cropOptions?: any;
};

type ImageError = 'tooSmall';

const defaultInitialCrop = {
  unit: '%',
  width: 100,
  aspect: 1,
};

const IMAGE_MIN_WIDTH = 100;
const IMAGE_MAX_WIDTH = 1000;
const IMAGE_MAX_SIZE = 2;

const compressionOptions = {
  maxWidthOrHeight: IMAGE_MAX_WIDTH,
  maxSizeMB: IMAGE_MAX_SIZE,
};

const minWidth = IMAGE_MIN_WIDTH;

const FormikImageUploadPopover = ({source, anchorEl, handleClose, cropOptions}: FormikImageUploadPopoverProps) => {
  const dispatch = useAppDispatch();
  const imageRef = useRef<HTMLImageElement>();
  const [crop, setCrop] = useState({...defaultInitialCrop, ...cropOptions});
  const [croppedBlob, setCroppedBlob] = useState<Blob>(null);
  const [isValid, setIsValid] = useState(true);
  const [notificationAllowed, setNotificationAllowed] = useState(true);

  const isOpen = Boolean(anchorEl);

  const resetCropAndHandleClose = (image: Image): void => {
    setCrop({...defaultInitialCrop, ...cropOptions});
    handleClose(image);
  };

  const onClose = (): void => {
    if (!isValid) {
      resetCropAndHandleClose(null);
    } else {
      imageCompression(croppedBlob as File, compressionOptions).then(async (compressedBlob: Blob) => {
        const filename = URL.createObjectURL(compressedBlob);
        const image = {filename, content: compressedBlob};
        resetCropAndHandleClose(image);
      });
    }
  };

  const onImageLoad = (image: HTMLImageElement): void => {
    imageRef.current = image;
  };

  const sendErrorNotifications = (errors: ImageError[]): void => {
    if (notificationAllowed && errors.length > 0) {
      errors.forEach((error) => {
        dispatch(SnackActions.handleCode('image.' + error, 'warning'));
      });
      setNotificationAllowed(false);
      setTimeout(() => setNotificationAllowed(true), 5000);
    }
  };

  const onCropChange = (crop: Crop): void => {
    const errors: ImageError[] = [];
    if (crop.width < minWidth || crop.height < minWidth) {
      errors.push('tooSmall');
    }
    sendErrorNotifications(errors);
    setIsValid(errors.length === 0);
    setCrop(crop);
  };

  const getCroppedImg = (img: HTMLImageElement, crop: Crop): Promise<Blob> => {
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
      canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg', 1);
    });
  };

  const onCropComplete = (crop: Crop): void => {
    if (imageRef.current && crop.width && crop.height) {
      getCroppedImg(imageRef.current, crop).then((croppedImage) => {
        setCroppedBlob(croppedImage);
      });
    } else {
      setCroppedBlob(null);
    }
  };

  const backgroundColor = !isValid ? 'error.main' : undefined;
  const boxStyles: SxProps = {...bodyStyles, backgroundColor};

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <Box sx={boxStyles}>
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

const bodyStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 325,
  padding: 1.5,
};

export default FormikImageUploadPopover;
