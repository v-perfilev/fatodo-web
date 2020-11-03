import React, {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {LabeledBox} from '../../common/surfaces/labeled-box';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';

type Props = HTMLAttributes<any>;

const ItemViewGroup: FC<Props> = ({className}: Props) => {
  const {t} = useTranslation();
  const {group} = useGroupViewContext();

  return (
    <LabeledBox label={t('item:labels.group')} className={className}>
      <Box>{group.title}</Box>
    </LabeledBox>
  );
};

export default ItemViewGroup;
