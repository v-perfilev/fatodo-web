import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {CircularSpinner} from '../../../components/loaders';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactOutcomingContainer from './contact-outcoming-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  filter: string;
};

const ContactOutcoming: FC<Props> = ({filter}: Props) => {
  const {outcomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = outcomingRequests
      .filter((r) => userMap.has(r.recipientId))
      .map((r) => ({...r, user: userMap.get(r.recipientId)}))
      .filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    const userIds = outcomingRequests.map((r) => r.recipientId);
    handleUserIds(userIds);
  }, [outcomingRequests]);

  useEffect(() => {
    if (users && outcomingRequests) {
      combineRequestsWithUsers();
    }
  }, [users, outcomingRequests]);

  return loading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ContactOutcomingContainer requests={userRequests} filter={filter} />
  );
};

export default ContactOutcoming;
