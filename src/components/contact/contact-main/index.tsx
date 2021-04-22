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
import {contactMainStyles} from './_styles';
import {compose} from 'recompose';
import {PlusIcon} from '../../common/icons/plus-icon';
import ContactRelations from '../contact-relations';
import ContactIncoming from '../contact-incoming';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {ContactRouteUtils} from '../_router';
import ContactOutcoming from '../contact-outcoming';
import {useContactDialogContext} from '../../../shared/contexts/dialog-contexts/contact-dialog-context';

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
  const classes = contactMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const {showContactRequestDialog} = useContactDialogContext();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(match.path));

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(calculateRouteFromTab(newTab));
    setActiveTab(newTab);
  };

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={openContactRequestDialog}
        color="primary"
        tooltip={t('contact:tooltips.addContact')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
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
  }, [i18n.language, showContactRequestDialog]);

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Tabs variant="fullWidth" textColor="primary" value={activeTab} onChange={handleChange}>
          <Tab label={t('contact:relations.title')} />
          <Tab label={t('contact:outcoming.title')} />
          <Tab label={t('contact:incoming.title')} />
        </Tabs>
        {activeTab === 0 && <ContactRelations />}
        {activeTab === 1 && <ContactOutcoming />}
        {activeTab === 2 && <ContactIncoming />}
      </Container>
    </>
  );
};

export default compose(withVerticalPadding)(ContactMain);
