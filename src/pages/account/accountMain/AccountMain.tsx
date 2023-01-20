import React from 'react';
import {useTranslation} from 'react-i18next';
import PageHeader from '../../../components/layouts/PageHeader';
import AccountMainForm from './AccountMainForm';
import {Button, SxProps} from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';
import PageDivider from '../../../components/layouts/PageDivider';
import {useAccountDialogContext} from '../../../shared/contexts/dialogContexts/AccountDialogContext';
import FVStack from '../../../components/boxes/FVStack';

const AccountMain = () => {
  const {t} = useTranslation();
  const {showDeletePermanentlyDialog} = useAccountDialogContext();

  return (
    <>
      <PageHeader maxWidth="md" title={t('routes.AccountForm')} />
      <PageContent sx={containerStyles} maxWidth="md">
        <FVStack spacing={2}>
          <AccountMainForm />
          <PageDivider />
          <Button variant="outlined" color="error" onClick={showDeletePermanentlyDialog}>
            {t('account:actions.deletePermanently')}
          </Button>
        </FVStack>
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingTop: 4,
  paddingBottom: 2,
};

export default AccountMain;
