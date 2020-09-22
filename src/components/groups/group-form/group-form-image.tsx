import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ImageUpload from '../../common/inputs/image-upload';
import {Image} from '../../../models/image.model';
import {Box, FormLabel} from '@material-ui/core';
import {groupFormImageStyles} from './_styles';
import Index from '../../common/images';

type Props = {
  values: any;
  setFieldValue: (field: string, value: any) => void;
};

const GroupFormImage: FC<Props> = ({values, setFieldValue}: Props) => {
  const classes = groupFormImageStyles();
  const {t} = useTranslation();
  const [image, setImage] = useState<Image>();

  useEffect(() => {
    const image = {filename: values.imageFilename, content: values.imageContent};
    setImage(image);
  }, []);

  useEffect(() => {
    setFieldValue('imageFilename', image.filename);
    setFieldValue('imageContent', image.content);
  }, [image]);

  return (
    <>
      <Box className={classes.label}>
        <FormLabel>{t('groups:fields.image.label')}</FormLabel>
      </Box>
      {image.filename && (
        <Box className={classes.preview}>
          <Index url={image.filename} size="lg" border={3} />
        </Box>
      )}
      <ImageUpload
        image={image}
        setImage={setImage}
        uploadLabel={t('groups:buttons.uploadImage')}
        updateLabel={t('groups:buttons.updateImage')}
        clearLabel={t('groups:buttons.clearImage')}
      />
    </>
  );
};

export default GroupFormImage;
