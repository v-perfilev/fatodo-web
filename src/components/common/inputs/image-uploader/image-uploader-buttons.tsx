import React, {FC, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {imageUploaderButtonsStyles} from './_styles';
import {Image} from '../../../../models/image.model';

type Props = {
  image: Image;
  setImage: (image) => void;
  setSource: (image: string | ArrayBuffer) => void;
  setAnchorEl: (e: HTMLElement) => void;
  uploadLabel: string;
  updateLabel: string;
  clearLabel: string;
};

const ImageUploaderButtons: FC<Props> = (props: Props) => {
  const classes = imageUploaderButtonsStyles();
  const {image, setImage, setSource, setAnchorEl, uploadLabel, updateLabel, clearLabel} = props;
  const inputRef = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const onImageLoaded = (event) => {
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
        <input id="upload-image" type="file" accept="image/*" className={classes.input} onChange={onImageLoaded}
               ref={inputRef} />
        <Button color="primary" variant="contained" component="span" ref={buttonRef}>
          {image ? updateLabel : uploadLabel}
        </Button>
      </label>
      {image && (
        <Button color="secondary" variant="contained" onClick={cleanImage}>
          {clearLabel}
        </Button>
      )}
    </Box>
  );
};

export default ImageUploaderButtons;
