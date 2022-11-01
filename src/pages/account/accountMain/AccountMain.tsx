import React from 'React';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import AccountMainForm from './AccountMainForm';
import {SxProps} from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';

const AccountMain = () => {
  const {t} = useTranslation();
  return (
    <>
      <PageHeader maxWidth="md" title={t('routes.AccountForm')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <AccountMainForm />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default AccountMain;
