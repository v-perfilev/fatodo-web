import React from 'React';
import {useAppDispatch} from '../../../store/store';
import {useNavigate} from 'react-router-dom';
import {Group} from '../../../models/Group';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {GroupActions} from '../../../store/group/groupActions';
import PageContainer from '../../../components/layouts/PageContainer';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import GroupForm from '../groupForm/GroupForm';
import FBox from '../../../components/boxes/FBox';
import {SxProps} from '@mui/material';

const GroupCreate = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const goBack = (): void => navigate(-1);
  const goToGroupView = (group: Group): void => navigate(GroupRouteUtils.getViewUrl(group.id));

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupActions.createGroupThunk(formData))
      .unwrap()
      .then((group) => goToGroupView(group))
      .catch(() => stopSubmitting());
  };
  return (
    <PageContainer>
      <PageHeader title={t('routes.GroupCreate')} />
      <FBox sx={formContainerStyles}>
        <GroupForm request={request} cancel={goBack} />
      </FBox>
    </PageContainer>
  );
};

const formContainerStyles: SxProps = {
  marginY: 1,
  marginX: 2,
};

export default GroupCreate;
