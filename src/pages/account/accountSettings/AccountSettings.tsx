import React from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import AccountSettingsForm from './AccountSettingsForm';
import PageContent from '../../../components/layouts/PageContent';
import {SxProps} from '@mui/material';
import AccountNotificationsForm from './AccountNotificationsForm';

const AccountSettings = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader maxWidth="md" title={t('routes.AccountSettingsForm')} />
      <PageContent sx={settingsStyles} maxWidth="md">
        <AccountSettingsForm />
      </PageContent>
      <PageHeader maxWidth="md" title={t('account:settings.labels.notifications')} />
      <PageContent sx={notificationsStyles} maxWidth="md">
        <AccountNotificationsForm />
      </PageContent>
    </>
  );
};

const settingsStyles: SxProps = {
  paddingTop: 4,
};

const notificationsStyles: SxProps = {
  paddingTop: 2,
  paddingBottom: 2,
};

export default AccountSettings;
