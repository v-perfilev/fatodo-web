import React from 'React';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import {flowRight} from 'lodash';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import {ItemActions} from '../../../store/item/itemActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import PageContainer from '../../../components/layouts/PageContainer';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import PageHeader from '../../../components/layouts/PageHeader';
import {Container} from '@mui/material';
import FBox from '../../../components/boxes/FBox';
import ItemForm from '../itemForm/ItemForm';
import {useTranslation} from 'react-i18next';
import ItemSelectors from '../../../store/item/itemSelectors';
import {Reminder} from '../../../models/Reminder';

type ItemEditProps = WithItemProps;

const ItemEdit = ({group, item, loading}: ItemEditProps) => {
  const dispatch = useAppDispatch();
  const reminders = useAppSelector(ItemSelectors.reminders);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupView = (): void => group && navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemView = (): void => item && navigate(ItemRouteUtils.getViewUrl(item.id));

  const request = (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void): void => {
    dispatch(ItemActions.updateItemThunk({dto, reminders}))
      .unwrap()
      .then(() => goToItemView())
      .catch(() => stopSubmitting());
  };

  return (
    <PageContainer>
      <ConditionalSpinner loading={loading}>
        <PageHeader title={t('routes.ItemEdit')} />
        <Container sx={{marginY: 1}}>
          <FBox sx={{marginX: 2}}>
            <ItemForm group={group} item={item} reminders={reminders} request={request} cancel={goToGroupView} />
          </FBox>
        </Container>
      </ConditionalSpinner>
    </PageContainer>
  );
};

export default flowRight([withItemContainer, withThemeProvider])(ItemEdit);
