import React, {ChangeEvent, CSSProperties, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from '../../../models/Image';
import {Button} from '@mui/material';
import FHStack from '../../boxes/FHStack';

type FormikImageUploadButtonProps = {
  image: Image;
  setImage: (image: Image) => void;
  setSource: (source: string) => void;
  setAnchorEl: (e: HTMLElement) => void;
};

const FormikImageUploadButtons = ({image, setImage, setSource, setAnchorEl}: FormikImageUploadButtonProps) => {
  const {t} = useTranslation();
  const inputRef = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const onImageLoaded = (event: ChangeEvent<any>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSource(String(reader.result)));
      reader.readAsDataURL(event.target.files[0]);
      setAnchorEl(buttonRef.current);
      inputRef.current.value = '';
    }
  };

  const cleanImage = (): void => {
    setImage(null);
  };

  return (
    <FHStack>
      <label htmlFor="upload-image">
        <input
          style={inputStyles}
          id="upload-image"
          type="file"
          accept="image/png, image/jpeg"
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
    </FHStack>
  );
};

const inputStyles: CSSProperties = {
  display: 'none',
};

export default FormikImageUploadButtons;
