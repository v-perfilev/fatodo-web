import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {CircularSpinner} from '../../../components/loaders';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactIncomingContainer from './contact-incoming-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  filter: string;
};

const ContactIncoming: FC<Props> = ({filter}: Props) => {
  const {incomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = incomingRequests
      .filter((r) => userMap.has(r.requesterId))
      .map((r) => ({...r, user: userMap.get(r.requesterId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    const userIds = incomingRequests.map((r) => r.recipientId);
    handleUserIds(userIds);
  }, [incomingRequests]);

  useEffect(() => {
    if (users && incomingRequests) {
      combineRequestsWithUsers();
    }
  }, [users]);

  return loading ? <CircularSpinner size="sm" /> : <ContactIncomingContainer requests={userRequests} filter={filter} />;
};

export default ContactIncoming;
