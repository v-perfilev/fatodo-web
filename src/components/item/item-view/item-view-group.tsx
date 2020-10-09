import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

const ItemViewGroup: FC = () => {
  const {t} = useTranslation();
  const {group} = useGroupViewContext();

  return (
    <LabeledBox label={t('items:labels.group')}>
      <Box>{group.title}</Box>
    </LabeledBox>
  );
};

export default ItemViewGroup;
