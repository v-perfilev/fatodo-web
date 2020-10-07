import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {PageDivider} from '../../common/surfaces/page-divider';

type Props = HTMLAttributes<any> & {
  description: string;
};

const ItemViewDescription: FC<Props> = ({description, className}: Props) => {
  const {t} = useTranslation();

  return (
    description && (
      <>
        <LabeledBox label={t('items:labels.description')} className={className}>
          <Box>{description}</Box>
        </LabeledBox>
        <PageDivider />
      </>
    )
  );
};

export default ItemViewDescription;
