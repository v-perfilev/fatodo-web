import React, { FC } from 'react';
import withHeader from '../../../shared/hoc/with-header';
import { compose } from 'recompose';
import { Container } from '@material-ui/core';
import { PageHeader } from '../../common/surfaces/page-header';
import { useTranslation } from 'react-i18next';
import { PageDivider } from '../../common/surfaces/page-divider';
import { accountSettingsStyles } from './_styles';

const AccountSettings: FC = () => {
  const classes = accountSettingsStyles();
  const { t } = useTranslation();

  return (
    <Container className={classes.root}>
      <PageHeader title={t("account:accountSettings.title")} />
      <PageDivider height={5} />
    </Container>
  );
}

export default compose(withHeader)(AccountSettings);
