import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ImageUploader from '../../common/inputs/image-uploader';
import {Image} from '../../../models/image.model';
import {Box, FormLabel} from '@material-ui/core';
import {groupFormImageStyles} from './_styles';
import RoundPic from '../../common/images/round-pic';

type Props = {
  values: any;
  setFieldValue: (field: string, value: Image) => void;
};

const GroupFormImage: FC<Props> = ({values, setFieldValue}: Props) => {
  const classes = groupFormImageStyles();
  const {t} = useTranslation();

  const filenameName = 'imageFilename';
  const contentName = 'imageContent';
  const filename = values.imageFilename;

  return (
    <>
      <Box className={classes.label}>
        <FormLabel>{t('groups:fields.image.label')}</FormLabel>
      </Box>
      {filename && (
        <Box className={classes.preview}>
          <RoundPic url={filename} size="lg" border={3} />
        </Box>
      )}
      <ImageUploader
        filenameName={filenameName}
        contentName={contentName}
        values={values}
        setFieldValue={setFieldValue}
        uploadLabel={t('groups:buttons.uploadImage')}
        updateLabel={t('groups:buttons.updateImage')}
        clearLabel={t('groups:buttons.clearImage')}
      />
    </>
  );
};

export default GroupFormImage;
