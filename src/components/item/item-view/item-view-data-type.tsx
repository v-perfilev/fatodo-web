import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import PaperBox from '../../common/page-layouts/paper-box';
import {ItemType} from '../../../models/item';
import {useTranslation} from 'react-i18next';

type Props = {
  type: ItemType;
};

const ItemViewDataType: FC<Props> = ({type}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.type')}>
      <PaperBox>{type}</PaperBox>
    </LabeledBox>
  );
};

export default ItemViewDataType;
