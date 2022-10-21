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
import {Container, Divider} from '@mui/material';
import ItemViewChanges from './ItemViewChanges';
import ItemReminders from './ItemReminders';
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
            {label: t('item:labels.status'), value: <StatusView statusType={item.status} />},
            {label: t('item:labels.type'), value: <TypeView type={item.type} />},
            {label: t('item:labels.priority'), value: <PriorityView priority={item.priority} />},
            {label: t('item:labels.date'), value: item.date && <DateParamView date={item.date} />},
          ]
        : [],
    [item, group, i18n.language],
  );

  return (
    <PageContainer>
      <ConditionalSpinner loading={loading}>
        <ItemViewHeader />
        <Container sx={{marginY: 1}}>
          <FVStack>
            <MultiLabeledBox items={labeledItems} />
            <Divider />
            <ItemViewDescription />
            {showReminders && <PageDivider />}
            {showReminders && <ItemReminders />}
            <Divider />
            <ItemViewChanges />
          </FVStack>
        </Container>
      </ConditionalSpinner>
    </PageContainer>
  );
};

export default flowRight([withItemContainer, withThemeProvider])(ItemView);
