import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {ItemType} from '../../../models/item';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';

type Props = {
  type: ItemType;
};

const ItemViewDataType: FC<Props> = ({type}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.type')}>
      <Box>{t('items:types.' + type)}</Box>
    </LabeledBox>
  );
};

export default ItemViewDataType;
