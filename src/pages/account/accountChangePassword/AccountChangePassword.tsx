import React from 'React';
import PageHeader from '../../../components/layouts/PageHeader';
import AccountChangePasswordForm from './AccountChangePasswordForm';
import {useTranslation} from 'react-i18next';
import {SxProps} from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';

const AccountChangePassword = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader maxWidth="md" title={t('routes.AccountChangePasswordForm')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <AccountChangePasswordForm />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default AccountChangePassword;