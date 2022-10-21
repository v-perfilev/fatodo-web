import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Typography} from '@mui/material';
import LabeledBox from '../../../components/surfaces/LabeledBox';

const ItemViewDescription: FC = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);

  return item?.description ? (
    <LabeledBox label={t('item:labels.description')} isVertical>
      {item.description}
    </LabeledBox>
  ) : (
    <Typography color="grey.500">{t('item:view.noDescription')}</Typography>
  );
};

export default ItemViewDescription;
