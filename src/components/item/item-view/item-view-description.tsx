import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PageDivider} from '../../common/surfaces/page-divider';
import {useItemViewContext} from '../../../shared/contexts/item-view-context';

type Props = HTMLAttributes<any>;

const ItemViewDescription: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item.description && (
      <>
        <LabeledBox label={t('items:labels.description')} className={className}>
          <Box>{item.description}</Box>
        </LabeledBox>
        <PageDivider />
      </>
    )
  );
};

export default ItemViewDescription;
