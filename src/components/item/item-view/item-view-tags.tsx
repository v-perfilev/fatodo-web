import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../common/layouts/labeled-box';

type Props = {
  tags: string[];
};

const ItemViewTags: FC<Props> = ({tags}: Props) => {
  const {t} = useTranslation();

  const showTags = tags && tags.length > 0;

  return showTags && (
    <LabeledBox label={t('items:labels.tags')}>
      {tags.map((tag, index) => (
        <Chip key={index} size="medium" label={tag} />
      ))}
    </LabeledBox>
  );
};

export default ItemViewTags;
