import React from 'React';
import {Container} from '@mui/material';
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

type ItemCreateProps = WithGroupProps;

const ItemCreate = ({group, loading}: ItemCreateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupView = (): void => group && navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemView = (item: Item): void => item && navigate(ItemRouteUtils.getViewUrl(item.id));

  const request = (dto: ItemDTO, stopSubmitting: () => void): void => {
    dispatch(ItemActions.createItemThunk(dto))
      .unwrap()
      .then((item) => goToItemView(item))
      .catch(() => stopSubmitting());
  };

  return (
    <PageContainer>
      <ConditionalSpinner loading={loading}>
        <PageHeader title={t('routes.ItemCreate')} />
        <Container sx={{marginY: 1}}>
          <FBox sx={{marginX: 2}}>
            <ItemForm group={group} request={request} cancel={goToGroupView} />
          </FBox>
        </Container>
      </ConditionalSpinner>
    </PageContainer>
  );
};

export default flowRight([withGroupContainer, withThemeProvider])(ItemCreate);
