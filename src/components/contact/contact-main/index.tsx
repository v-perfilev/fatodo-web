import React, {FC, useEffect, useState} from 'react';
import {Container, Tab, Tabs} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import {contactListStyles} from './_styles';
import {compose} from 'recompose';
import {PlusIcon} from '../../common/icons/plus-icon';
import ContactRequestDialog from '../../common/dialogs/contact-request-dialog';
import ContactList from '../contact-list';
import ContactOutcoming from '../contact-outcoming';
import ContactIncoming from '../contact-incoming';
import withVerticalPadding from '../../../shared/hoc/with-vertical-padding/with-vertical-padding';
import {ContactRouteUtils} from '../_router';

const calculateTabFromRoute = (path: string): number => {
  switch (path) {
    case ContactRouteUtils.getOutcomingUrl():
      return 1;
    case ContactRouteUtils.getIncomingUrl():
      return 2;
    default:
      return 0;
  }
};

const calculateRouteFromTab = (tab: number): string => {
  switch (tab) {
    case 1:
      return ContactRouteUtils.getOutcomingUrl();
    case 2:
      return ContactRouteUtils.getIncomingUrl();
    default:
      return ContactRouteUtils.getListUrl();
  }
};

const ContactMain: FC = () => {
  const classes = contactListStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(match.path));
  const [showRequestDialog, setShowRequestDialog] = useState<boolean>(false);

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const openRequestDialog = (): void => setShowRequestDialog(true);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(calculateRouteFromTab(newTab));
    setActiveTab(newTab);
  };

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={openRequestDialog}
        color="primary"
        tooltip={t('contact:tooltips.addContact')}
      />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  return (
    <>
      <Container>
        <Tabs variant="fullWidth" textColor="primary" value={activeTab} onChange={handleChange}>
          <Tab label={t('contact:list.title')} />
          <Tab label={t('contact:outcoming.title')} />
          <Tab label={t('contact:incoming.title')} />
        </Tabs>
        {activeTab === 0 && <ContactList />}
        {activeTab === 1 && <ContactOutcoming />}
        {activeTab === 2 && <ContactIncoming />}
      </Container>
      <ContactRequestDialog show={showRequestDialog} setShow={setShowRequestDialog} />
    </>
  );
};

export default compose(withVerticalPadding)(ContactMain);
