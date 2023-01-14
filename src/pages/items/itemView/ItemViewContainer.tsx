import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import PriorityView from '../../../components/views/PriorityView';
import PageDivider from '../../../components/layouts/PageDivider';
import {Divider, SxProps} from '@mui/material';
import ItemViewChanges from './ItemViewChanges';
import ItemViewReminders from './ItemViewReminders';
import ItemViewDescription from './ItemViewDescription';
import FVStack from '../../../components/boxes/FVStack';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ItemViewHeader from './ItemViewHeader';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../../../components/surfaces/MultiLabeledBox';
import {Group} from '../../../models/Group';
import {Item} from '../../../models/Item';
import PageContent from '../../../components/layouts/PageContent';
import StatusView from '../../../components/views/StatusView';

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
            {label: t('item:labels.priority'), value: <PriorityView fontSize={14} priority={item.priority} />},
            {label: t('item:labels.status'), value: <StatusView fontSize={14} done={item.done} />},
          ]
        : [],
    [item, group, i18n.language],
  );

  return (
    <ConditionalSpinner loading={loading}>
      <ItemViewHeader toggleCollapsed={toggleCollapsed} />
      <PageContent sx={containerStyles} maxWidth="md">
        <FVStack>
          <MultiLabeledBox items={labeledItems} />
          <Divider />
          <ItemViewDescription />
          {showReminders && <PageDivider />}
          {showReminders && <ItemViewReminders />}
          <Divider />
          <ItemViewChanges />
        </FVStack>
      </PageContent>
    </ConditionalSpinner>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default ItemViewContainer;
