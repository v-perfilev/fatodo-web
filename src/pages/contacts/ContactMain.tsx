import React from 'React';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton, SxProps, Tab, Tabs} from '@mui/material';
import PageContainer from '../../components/layouts/PageContainer';
import {useAppSelector} from '../../store/store';
import ContactsSelectors from '../../store/contacts/contactsSelectors';
import {useLocation, useNavigate} from 'react-router-dom';
import BadgeWithoutIcon from '../../components/icons/badgeIcons/BadgeWithoutIcon';
import ContactList from './contactList/ContactList';
import {ContactRouteUtils} from '../../routes/ContactRouter';
import IncomingRequestList from './incomingRequestList/IncomingRequestList';
import OutcomingRequestList from './outcomingRequestList/OutcomingRequestList';
import FHStack from '../../components/boxes/FHStack';
import PlusIcon from '../../components/icons/PlusIcon';
import PageContent from '../../components/layouts/PageContent';
import {useContactDialogContext} from '../../shared/contexts/dialogContexts/ContactDialogContext';
import FVStack from '../../components/boxes/FVStack';
import FBox from '../../components/boxes/FBox';

const calculateTabFromRoute = (path: string): number => {
  switch (path) {
    case ContactRouteUtils.getOutcomingUrl():
      return 2;
    case ContactRouteUtils.getIncomingUrl():
      return 1;
    default:
      return 0;
  }
};

const calculateRouteFromTab = (tab: number): string => {
  switch (tab) {
    case 2:
      return ContactRouteUtils.getOutcomingUrl();
    case 1:
      return ContactRouteUtils.getIncomingUrl();
    default:
      return ContactRouteUtils.getListUrl();
  }
};

const ContactMain = () => {
  const contactInfo = useAppSelector(ContactsSelectors.info);
  const {showContactRequestDialog} = useContactDialogContext();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(calculateTabFromRoute(location.pathname));

  const {relationCount, incomingRequestCount, outcomingRequestCount} = contactInfo;

  const handleChange = (event: React.ChangeEvent, newTab: number): void => {
    navigate(calculateRouteFromTab(newTab), {replace: true});
    setActiveTab(newTab);
  };

  const relationsIcon = relationCount > 0 ? <BadgeWithoutIcon color="secondary" count={relationCount} /> : undefined;
  const incomingIcon =
    incomingRequestCount > 0 ? <BadgeWithoutIcon color="error" count={incomingRequestCount} /> : undefined;
  const outcomingIcon =
    outcomingRequestCount > 0 ? <BadgeWithoutIcon color="secondary" count={outcomingRequestCount} /> : undefined;

  return (
    <PageContainer>
      <PageContent maxWidth="md" disableGutters>
        <FHStack>
          <Tabs sx={tabsStyles} variant="scrollable" textColor="primary" value={activeTab} onChange={handleChange}>
            <Tab sx={tabStyles} label={t('contact:relations.title')} icon={relationsIcon} iconPosition="end" />
            <Tab sx={tabStyles} label={t('contact:incoming.title')} icon={incomingIcon} iconPosition="end" />
            <Tab sx={tabStyles} label={t('contact:outcoming.title')} icon={outcomingIcon} iconPosition="end" />
          </Tabs>
          <IconButton color="primary" size="large" onClick={showContactRequestDialog}>
            <PlusIcon />
          </IconButton>
        </FHStack>
      </PageContent>
      {activeTab === 0 && <ContactList />}
      {activeTab === 1 && <IncomingRequestList />}
      {activeTab === 2 && <OutcomingRequestList />}
    </PageContainer>
  );
};

const tabsStyles: SxProps = {
  width: '100%',
};

const tabStyles: SxProps = {
  minHeight: 55,
};

export default ContactMain;
