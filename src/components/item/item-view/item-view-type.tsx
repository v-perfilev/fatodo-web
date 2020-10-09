import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {TypeView} from '../../common/views/type-view';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

const ItemViewType: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('items:labels.type')}>
      <TypeView type={item.type} />
    </LabeledBox>
  );
};

export default ItemViewType;
