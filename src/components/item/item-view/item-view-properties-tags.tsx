import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import PaperBox from '../../common/page-layouts/paper-box';
import PageSpacer from '../../common/page-layouts/page-spacer';
import {useTranslation} from 'react-i18next';

type Props = {
  tags: string[];
};

const ItemViewPropertiesTags: FC<Props> = ({tags}: Props) => {
  const {t} = useTranslation();

  const showTags = tags && tags.length > 0;

  return showTags && (
    <>
      <LabeledBox label={t('items:labels.tags')}>
        {tags.map((tag, index) => (
          <PaperBox key={index}>{tag}</PaperBox>
        ))}
      </LabeledBox>
      <PageSpacer />
    </>
  );
};

export default ItemViewPropertiesTags;
