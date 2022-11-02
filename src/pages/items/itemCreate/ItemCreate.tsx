import React from 'react';
import {SxProps} from '@mui/material';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import {Item} from '../../../models/Item';
import {useAppDispatch} from '../../../store/store';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import {ItemActions} from '../../../store/item/itemActions';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import ItemForm from '../itemForm/ItemForm';
import {Reminder} from '../../../models/Reminder';
import PageContent from '../../../components/layouts/PageContent';

type ItemCreateProps = WithGroupProps;

const ItemCreate = ({group, loading}: ItemCreateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupView = (): void => group && navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemView = (item: Item): void => item && navigate(ItemRouteUtils.getViewUrl(item.id));

  const request = (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void): void => {
    dispatch(ItemActions.createItemThunk({dto, reminders}))
      .unwrap()
      .then((item) => goToItemView(item))
      .catch(() => stopSubmitting());
  };

  return (
    <ConditionalSpinner loading={loading}>
      <PageHeader maxWidth="md" title={t('routes.ItemCreate')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <ItemForm group={group} request={request} cancel={goToGroupView} />
      </PageContent>
    </ConditionalSpinner>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default flowRight([withGroupContainer, withThemeProvider])(ItemCreate);
