import React, {ChangeEvent, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {Image} from '../../../models/image.model';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';

type FormikImageUploadButtonProps = {
  image: Image;
  setImage: (image: Image) => void;
  setSource: (source: string) => void;
  setAnchorEl: (e: HTMLElement) => void;
};

const FormikImageUploadButtons = ({image, setImage, setSource, setAnchorEl}: FormikImageUploadButtonProps) => {
  const classes = formikImageUploadButtonsStyles();
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
    <Box className={classes.buttons}>
      <label htmlFor="upload-image">
        <input
          id="upload-image"
          type="file"
          accept="image/png, image/jpeg"
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

const formikImageUploadButtonsStyles = makeStyles((theme: Theme) => ({
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  input: {
    display: 'none',
  },
}));

export default FormikImageUploadButtons;
