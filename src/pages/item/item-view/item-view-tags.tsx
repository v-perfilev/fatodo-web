import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip} from '@material-ui/core';
import {LabeledBox} from '../../../components/surfaces/labeled-box';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {itemViewCommonStyles} from './_styles';

const ItemViewTags: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  const showTags = item.tags?.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('item:labels.tags')}>
        {item.tags.map((tag) => (
          <Chip key={tag} size="medium" label={tag} className={commonClasses.box} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
