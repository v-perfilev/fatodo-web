import React from 'React';
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
import PageContainer from '../../../components/layouts/PageContainer';
import {useTranslation} from 'react-i18next';
import ItemForm from '../itemForm/ItemForm';
import FBox from '../../../components/boxes/FBox';
import {Reminder} from '../../../models/Reminder';

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
    <PageContainer maxWidth="md">
      <ConditionalSpinner loading={loading}>
        <PageHeader title={t('routes.ItemCreate')} />
        <FBox sx={formContainerStyles}>
          <ItemForm group={group} request={request} cancel={goToGroupView} />
        </FBox>
      </ConditionalSpinner>
    </PageContainer>
  );
};

const formContainerStyles: SxProps = {
  marginY: 1,
  marginX: 2,
};

export default flowRight([withGroupContainer, withThemeProvider])(ItemCreate);
