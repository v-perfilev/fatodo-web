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
import {PageSpacer} from '../../../components/surfaces';
import ContactHeader from './contact-header';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import BadgeWithoutIcon from '../../../components/icons/badge-icons/badge-without-icon';

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
  const {update: updateContacts} = useContactContext();
  const {relationCount, outcomingRequestCount, incomingRequestCount, update: updateInfo} = useContactInfoContext();
  const {showContactRequestDialog} = useContactDialogContext();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(match.path));
  const [filter, setFilter] = useState<string>('');

  const openContactRequestDialog = (): void => {
    const onSuccess = (): void => {
      updateContacts();
      updateInfo();
    };
    showContactRequestDialog(onSuccess);
  };

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number): void => {
    history.replace(calculateRouteFromTab(newTab));
    setActiveTab(newTab);
  };

  const menuElements = [
    {icon: <PlusIcon />, action: openContactRequestDialog, text: t('contact:tooltips.addContact')},
  ] as MenuElement[];

  useEffect(() => {
    updateInfo();
    updateContacts();
  }, []);

  useEffect(() => {
    setMenu(menuElements);
  }, [i18n.language, activeTab, showContactRequestDialog]);

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Tabs variant="fullWidth" textColor="primary" value={activeTab} onChange={handleChange}>
          <Tab
            label={t('contact:relations.title')}
            icon={relationCount > 0 && <BadgeWithoutIcon color="secondary" count={relationCount} />}
          />
          <Tab
            label={t('contact:outcoming.title')}
            icon={outcomingRequestCount > 0 && <BadgeWithoutIcon color="secondary" count={outcomingRequestCount} />}
          />
          <Tab
            label={t('contact:incoming.title')}
            icon={incomingRequestCount > 0 && <BadgeWithoutIcon color="error" count={incomingRequestCount} />}
          />
        </Tabs>
        <PageSpacer />
        <ContactHeader setFilter={setFilter} />
        {activeTab === 0 && <ContactRelations filter={filter} />}
        {activeTab === 1 && <ContactOutcoming filter={filter} />}
        {activeTab === 2 && <ContactIncoming filter={filter} />}
      </Container>
    </>
  );
};

export default withVerticalPadding(ContactMain);
