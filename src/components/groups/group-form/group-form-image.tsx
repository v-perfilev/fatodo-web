import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ImageUploader from '../../common/inputs/image-uploader';
import {Image} from '../../../models/image.model';

type Props = {
  values: any;
  setFieldValue: (field: string, value: Image) => void;
};

const GroupFormImage: FC<Props> = ({values, setFieldValue}: Props) => {
  const {t} = useTranslation();

  return (
    <ImageUploader
      label={t('groups:fields.image.label')}
      filenameName="imageFilename"
      contentName="imageContent"
      values={values}
      setFieldValue={setFieldValue}
      uploadLabel={t('groups:buttons.uploadImage')}
      updateLabel={t('groups:buttons.updateImage')}
      clearLabel={t('groups:buttons.clearImage')}
    />
  );
};

export default GroupFormImage;
