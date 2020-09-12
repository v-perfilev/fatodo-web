import React, {FC, useRef} from 'react';
import {Box, Button} from '@material-ui/core';
import {imageUploaderButtonAndPreviewStyles} from './_styles';
import {Image} from '../../../../models/image.model';
import RoundPic from '../../images/round-pic';

type Props = {
  image: Image;
  setImage: (image) => void;
  setSource: (image: string | ArrayBuffer) => void;
  setAnchorEl: (e: HTMLElement) => void;
};

const ImageUploaderButtonsAndPreview: FC<Props> = ({image, setImage, setSource, setAnchorEl}: Props) => {
  const classes = imageUploaderButtonAndPreviewStyles();
  const buttonRef = useRef<HTMLElement>();

  const onImageLoaded = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSource(reader.result));
      reader.readAsDataURL(event.target.files[0]);
      setAnchorEl(buttonRef.current);
    }
  };

  const cleanImage = (): void => {
    setImage(null);
  };

  return (
    <>
      <Box className={classes.buttons}>
        <label htmlFor="upload-image">
          <input id="upload-image" type="file" accept="image/*" className={classes.input} onChange={onImageLoaded} />
          <Button color="primary" variant="contained" component="span" ref={buttonRef}>
            Upload image
          </Button>
        </label>
        <Button color="secondary" variant="contained" onClick={cleanImage}>
          Clear image
        </Button>
      </Box>
      {image && (
        <RoundPic url={image.url} size="big" />
      )}
    </>
  );
};

export default ImageUploaderButtonsAndPreview;
