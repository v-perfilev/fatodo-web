import React, {FC, useEffect} from 'react';
import withHeader from '../../../shared/hoc/with-header';
import {compose} from 'recompose';
import {Container} from '@material-ui/core';
import {PageHeader} from '../../common/surfaces/page-header';
import {useTranslation} from 'react-i18next';
import {PageDivider} from '../../common/surfaces/page-divider';
import {accountSettingsStyles} from './_styles';
import withAdditionalMenu from '../../../shared/hoc/with-additional-menu';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {CheckIcon} from '../../common/icons/check-icon';
import {CloseIcon} from '../../common/icons/close-icon';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';

const AccountSettings: FC = () => {
  const classes = accountSettingsStyles();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<CheckIcon />}
        action={console.log}
        color="primary"
        tooltip={t('account:tooltips.save')}
      />
      <AdditionalMenuButton
        icon={<CloseIcon />}
        action={console.log}
        color="secondary"
        tooltip={t('account:tooltips.cancel')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return (
    <Container className={classes.root}>
      <PageHeader title={t('account:accountSettings.title')} />
      <PageDivider height={5} />
    </Container>
  );
};

export default compose(withHeader, withAdditionalMenu)(AccountSettings);
