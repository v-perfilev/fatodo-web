import React from 'React';
import {flowRight} from 'lodash';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
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

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, loading}: ItemViewProps) => {
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
    <PageContainer>
      <ConditionalSpinner loading={loading}>
        <ItemViewHeader />
        <FVStack sx={containerStyles}>
          <MultiLabeledBox items={labeledItems} />
          <Divider />
          <ItemViewDescription />
          {showReminders && <PageDivider />}
          {showReminders && <ItemViewReminders />}
          <Divider />
          <ItemViewChanges />
        </FVStack>
      </ConditionalSpinner>
    </PageContainer>
  );
};

const containerStyles: SxProps = {
  marginY: 1,
  marginX: 2,
};

export default flowRight([withItemContainer, withThemeProvider])(ItemView);
