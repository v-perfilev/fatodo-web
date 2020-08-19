import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {Group} from '../../../models/group';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';

type Props = {
  group: Group;
};

const ItemViewDataGroup: FC<Props> = ({group}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.group')}>
      <Box>{group.title}</Box>
    </LabeledBox>
  );
};

export default ItemViewDataGroup;
