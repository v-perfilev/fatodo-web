import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import LabeledBox from '../../common/layouts/labeled-box';
import {useTranslation} from 'react-i18next';
import PageDivider from '../../common/layouts/page-divider';

type Props = {
  description: string;
};

const ItemViewDescription: FC<Props> = ({description}: Props) => {
  const {t} = useTranslation();

  return description && (
    <>
      <PageDivider />
      <LabeledBox label={t('items:labels.description')}>
        <Box>{description}</Box>
      </LabeledBox>
      <PageDivider />
    </>
  );
};

export default ItemViewDescription;
