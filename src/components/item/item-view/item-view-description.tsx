import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PageDivider} from '../../common/surfaces/page-divider';
import {useItemViewContext} from '../../../shared/contexts/view-contexts/item-view-context';
import {itemViewCommonStyles} from './_styles';

const ItemViewDescription: FC = () => {
  const commonClasses = itemViewCommonStyles();
  const {t} = useTranslation();
  const {obj: item} = useItemViewContext();

  return (
    item.description && (
      <>
        <LabeledBox label={t('item:labels.description')} className={commonClasses.box}>
          <Box>{item.description}</Box>
        </LabeledBox>
        <PageDivider />
      </>
    )
  );
};

export default ItemViewDescription;
