import React, {FC} from 'react';
import LabeledBox from '../../common/layout-page/labeled-box';
import PageSpacer from '../../common/layout-page/page-spacer';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';

type Props = {
  tags: string[];
};

const ItemViewPropertiesTags: FC<Props> = ({tags}: Props) => {
  const {t} = useTranslation();

  const showTags = tags && tags.length > 0;

  return (
    showTags && (
      <>
        <LabeledBox label={t('items:labels.tags')}>
          {tags.map((tag, index) => (
            <Chip key={index} size="medium" label={tag} />
          ))}
        </LabeledBox>
        <PageSpacer />
      </>
    )
  );
};

export default ItemViewPropertiesTags;
