import React from 'React';
import {SxProps} from '@mui/material';
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
import FBox from '../../../components/boxes/FBox';

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
    <PageContainer maxWidth="md">
      <ConditionalSpinner loading={loading}>
        <PageHeader title={t('routes.GroupEdit')} />
        <FBox sx={formContainerStyles}>
          <GroupForm group={group} request={request} cancel={goToGroupView} />
        </FBox>
      </ConditionalSpinner>
    </PageContainer>
  );
};

const formContainerStyles: SxProps = {
  marginY: 1,
  marginX: 2,
};

export default flowRight([withGroupContainer, withThemeProvider])(GroupEdit);
