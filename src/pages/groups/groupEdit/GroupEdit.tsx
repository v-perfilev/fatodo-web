import React from 'React';
import {Container} from '@mui/material';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import {GroupActions} from '../../../store/group/groupActions';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../store/store';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import PageHeader from '../../../components/layouts/PageHeader';
import GroupForm from '../groupForm/GroupForm';
import PageContainer from '../../../components/layouts/PageContainer';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';

type GroupEditProps = WithGroupProps;

const GroupEdit = ({group, loading}: GroupEditProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goToGroupView = (): void => navigate(GroupRouteUtils.getViewUrl(group?.id));

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupActions.updateGroupThunk(formData))
      .unwrap()
      .then(() => goToGroupView())
      .catch(() => stopSubmitting());
  };

  return (
    <PageContainer>
      <ConditionalSpinner loading={loading}>
        <PageHeader title={t('routes.GroupEdit')} />
        <Container sx={{marginY: 1}}>
          <GroupForm group={group} request={request} cancel={goToGroupView} />
        </Container>
      </ConditionalSpinner>
    </PageContainer>
  );
};

export default flowRight([withGroupContainer, withThemeProvider])(GroupEdit);
