import React, {FC, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {imageUploadButtonsStyles} from './_styles';
import {Image} from '../../../models/image.model';
import {useTranslation} from 'react-i18next';

type Props = {
  image: Image;
  setImage: (image) => void;
  setSource: (source: string | ArrayBuffer) => void;
  setAnchorEl: (e: HTMLElement) => void;
};

export const ImageUploadButtons: FC<Props> = ({image, setImage, setSource, setAnchorEl}: Props) => {
  const classes = imageUploadButtonsStyles();
  const {t} = useTranslation();
  const inputRef = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const onImageLoaded = (event): void => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSource(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setAnchorEl(buttonRef.current);
      inputRef.current.value = '';
    }
  };

  const cleanImage = (): void => {
    setImage(null);
  };

  return (
    <Box className={classes.buttons}>
      <label htmlFor="upload-image">
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          className={classes.input}
          onChange={onImageLoaded}
          ref={inputRef}
        />
        <Button color="primary" variant="contained" component="span" ref={buttonRef}>
          {image ? t('common:imageUpload.buttons.update') : t('common:imageUpload.buttons.upload')}
        </Button>
      </label>
      {image && (
        <Button color="secondary" variant="contained" onClick={cleanImage}>
          {t('common:imageUpload.buttons.clear')}
        </Button>
      )}
    </Box>
  );
};
