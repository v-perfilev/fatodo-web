import React, {FC} from 'react';
import LabeledBox from '../../common/page-layouts/labeled-box';
import {Group} from '../../../models/group';
import PaperBox from '../../common/page-layouts/paper-box';
import {useTranslation} from 'react-i18next';

type Props = {
  group: Group;
};

const ItemViewDataGroup: FC<Props> = ({group}: Props) => {
  const {t} = useTranslation();

  return (
    <LabeledBox label={t('items:labels.group')}>
      <PaperBox text={group.title} />
    </LabeledBox>
  );
};

export default ItemViewDataGroup;
