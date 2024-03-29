import React, {ReactElement, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import AuthSelectors from '../../../store/auth/authSelectors';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {UserUtils} from '../../../shared/utils/UserUtils';

const ItemViewChanges = () => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const item = useAppSelector(ItemSelectors.item);
  const creator = useAppSelector((state) => userSelector(state, item.createdBy));
  const updater = useAppSelector((state) => userSelector(state, item.lastModifiedBy));

  const formatDate = (timestamp: number): string => {
    return DateFormatters.formatDate(new Date(timestamp), account, 'FULL', 'FULL');
  };

  const labeledBox = (label: string, text: string): ReactElement => (
    <LabeledBox label={label} color="grey.500" fontSize={13}>
      {text}
    </LabeledBox>
  );

  return (
    <FVStack flexGrow={0}>
      {creator && (
        <FHStack flexWrap="wrap">
          {labeledBox(t('item:labels.createdBy'), UserUtils.getUsername(creator, t))}
          {labeledBox(t('item:labels.createdAt'), formatDate(item.createdAt))}
        </FHStack>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <FHStack flexWrap="wrap">
          {labeledBox(t('item:labels.updatedBy'), UserUtils.getUsername(updater, t))}
          {labeledBox(t('item:labels.createdAt'), formatDate(item.lastModifiedAt))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default ItemViewChanges;
