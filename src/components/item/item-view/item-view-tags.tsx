import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../common/layouts/labeled-box';

type Props = HTMLAttributes<any> & {
  tags: string[];
};

const ItemViewTags: FC<Props> = ({tags, className}: Props) => {
  const {t} = useTranslation();

  const showTags = tags && tags.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('items:labels.tags')} className={className}>
        {tags.map((tag, index) => (
          <Chip key={index} size="medium" label={tag} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
