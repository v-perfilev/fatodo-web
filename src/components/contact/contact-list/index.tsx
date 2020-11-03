import React, {FC, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';

const ContactList: FC = () => {
  const history = useHistory();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();

  const redirectToPreviousLocation = (): void => history.goBack();

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="primary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return <Box>Test</Box>;
};

export default ContactList;
