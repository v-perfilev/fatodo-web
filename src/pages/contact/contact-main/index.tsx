import React, {FC, useEffect, useState} from 'react';
import {Container, Tab, Tabs} from '@material-ui/core';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {contactMainStyles} from './_styles';
import {PlusIcon} from '../../../components/icons/plus-icon';
import ContactRelations from '../contact-relations';
import ContactIncoming from '../contact-incoming';
import withVerticalPadding from '../../../shared/hocs/with-vertical-padding/with-vertical-padding';
import {ContactRouteUtils} from '../_router';
import ContactOutcoming from '../contact-outcoming';
import {useContactDialogContext} from '../../../shared/contexts/dialog-contexts/contact-dialog-context';
import {MenuElement} from '../../../shared/contexts/menu-contexts/types';
import ControlMenu from '../../../components/layouts/control-menu';
import {PageSpacer} from '../../../components/surfaces';

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
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {setMenu} = useAdditionalMenuContext();
  const {showContactRequestDialog} = useContactDialogContext();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(match.path));

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(calculateRouteFromTab(newTab));
    setActiveTab(newTab);
  };

  const menuElements = [
    {icon: <PlusIcon />, action: openContactRequestDialog, text: t('contact:tooltips.addContact')},
  ] as MenuElement[];

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, activeTab, showContactRequestDialog]);

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Tabs variant="fullWidth" textColor="primary" value={activeTab} onChange={handleChange}>
          <Tab label={t('contact:relations.title')} />
          <Tab label={t('contact:outcoming.title')} />
          <Tab label={t('contact:incoming.title')} />
        </Tabs>
        <PageSpacer />
        <ControlMenu menu={menuElements} />
        {activeTab === 0 && <ContactRelations />}
        {activeTab === 1 && <ContactOutcoming />}
        {activeTab === 2 && <ContactIncoming />}
      </Container>
    </>
  );
};

export default withVerticalPadding(ContactMain);
