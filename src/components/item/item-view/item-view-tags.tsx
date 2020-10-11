import React, { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import { LabeledBox } from '../../common/surfaces/labeled-box';
import { useItemViewContext } from '../../../shared/contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewTags: FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();
  const { item } = useItemViewContext();

  const showTags = item.tags?.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('items:labels.tags')} className={className}>
        {item.tags.map((tag, index) => (
          <Chip key={index} size="medium" label={tag} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
