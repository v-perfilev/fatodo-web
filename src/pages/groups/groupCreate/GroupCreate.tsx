import React from 'react';
import {useAppDispatch} from '../../../store/store';
import {useNavigate} from 'react-router-dom';
import {Group} from '../../../models/Group';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {GroupActions} from '../../../store/group/groupActions';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import GroupForm from '../groupForm/GroupForm';
import {SxProps} from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';

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
    <>
      <PageHeader maxWidth="md" title={t('routes.GroupCreate')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <GroupForm request={request} cancel={goBack} />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default GroupCreate;
