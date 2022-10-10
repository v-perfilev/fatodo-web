import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import ContactIncomingStub from './contact-incoming-stub';
import ContactIncomingList from './contact-incoming-list';

type Props = {
  requests: ContactRequestWithUser[];
  filter: string;
};

const ContactIncomingContainer: FC<Props> = ({requests, filter}: Props) => {
  const [requestsWithUser, setRequestsWithUser] = useState<ContactRequestWithUser[]>([]);

  useEffect(() => {
    const filteredRelations = requests.filter((r) => {
      const str = r.user.username + r.user.firstname + r.user.lastname;
      return str.includes(filter);
    });
    setRequestsWithUser(filteredRelations);
  }, [requests, filter]);

  return (
    <>
      {requests.length === 0 && <ContactIncomingStub />}
      {requests.length > 0 && <ContactIncomingList requests={requestsWithUser} />}
    </>
  );
};

export default ContactIncomingContainer;
