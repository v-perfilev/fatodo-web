import React from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import AccountSettingsForm from './AccountSettingsForm';
import PageContent from '../../../components/layouts/PageContent';
import {SxProps} from '@mui/material';

const AccountSettings = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader maxWidth="md" title={t('routes.AccountSettingsForm')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <AccountSettingsForm />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default AccountSettings;
