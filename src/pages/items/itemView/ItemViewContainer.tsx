import React from 'React';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import {useMemo} from 'react';
import StatusView from '../../../components/views/StatusView';
import TypeView from '../../../components/views/TypeView';
import PriorityView from '../../../components/views/PriorityView';
import PageDivider from '../../../components/layouts/PageDivider';
import {Divider, SxProps} from '@mui/material';
import ItemViewChanges from './ItemViewChanges';
import ItemViewReminders from './ItemViewReminders';
import ItemViewDescription from './ItemViewDescription';
import FVStack from '../../../components/boxes/FVStack';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ItemViewHeader from './ItemViewHeader';
import PageContainer from '../../../components/layouts/PageContainer';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../../../components/surfaces/MultiLabeledBox';
import DateParamView from '../../../components/views/DateParamView';
import {Group} from '../../../models/Group';
import {Item} from '../../../models/Item';

type ItemViewContainerProps = {
  group: Group;
  item: Item;
  loading: boolean;
  toggleCollapsed?: () => void;
};

const ItemViewContainer = ({group, item, loading, toggleCollapsed}: ItemViewContainerProps) => {
  const {t, i18n} = useTranslation();
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showReminders = reminders?.length > 0;

  const labeledItems = useMemo<MultiLabeledBoxItem[]>(
    () =>
      item
        ? [
            {label: t('item:labels.item'), value: item.title},
            {label: t('item:labels.group'), value: group?.title},
            {label: t('item:labels.status'), value: <StatusView fontSize={14} statusType={item.status} />},
            {label: t('item:labels.type'), value: <TypeView fontSize={14} type={item.type} />},
            {label: t('item:labels.priority'), value: <PriorityView fontSize={14} priority={item.priority} />},
            {label: t('item:labels.date'), value: item.date && <DateParamView fontSize={14} date={item.date} />},
          ]
        : [],
    [item, group, i18n.language],
  );

  return (
    <ConditionalSpinner loading={loading}>
      <ItemViewHeader toggleCollapsed={toggleCollapsed} />
      <PageContainer maxWidth="md">
        <FVStack sx={containerStyles}>
          <MultiLabeledBox items={labeledItems} />
          <Divider />
          <ItemViewDescription />
          {showReminders && <PageDivider />}
          {showReminders && <ItemViewReminders />}
          <Divider />
          <ItemViewChanges />
        </FVStack>
      </PageContainer>
    </ConditionalSpinner>
  );
};

const containerStyles: SxProps = {
  marginY: 1,
  marginX: 2,
};

export default ItemViewContainer;
