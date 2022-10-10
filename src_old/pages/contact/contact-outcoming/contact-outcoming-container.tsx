import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import ContactOutcomingStub from './contact-outcoming-stub';
import ContactOutcomingList from './contact-outcoming-list';

type Props = {
  requests: ContactRequestWithUser[];
  filter: string;
};

const ContactOutcomingContainer: FC<Props> = ({requests, filter}: Props) => {
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
      {requests.length === 0 && <ContactOutcomingStub />}
      {requests.length > 0 && <ContactOutcomingList requests={requestsWithUser} />}
    </>
  );
};

export default ContactOutcomingContainer;
