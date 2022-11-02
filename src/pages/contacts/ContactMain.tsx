import React, {useCallback} from 'react';
import PageMultiColumn from '../../components/layouts/PageMultiColumn';
import EventList from '../events/eventList/EventList';
import ContactMainContainer from './ContactMainContainer';

const ContactMain = () => {
  const mainElement = useCallback(() => <ContactMainContainer />, []);

  const additionalElement = useCallback(() => <EventList />, []);

  return <PageMultiColumn disableOnSmartDevice {...{mainElement, additionalElement}} />;
};

export default ContactMain;
