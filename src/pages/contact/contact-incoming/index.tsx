import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactIncomingContainer from './contact-incoming-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ContactSkeletons from '../contact-skeletons/contact-skeletons';

type Props = {
  filter: string;
};

const ContactIncoming: FC<Props> = ({filter}: Props) => {
  const {incomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

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
    const userIds = incomingRequests.map((r) => r.requesterId);
    handleUserIds(userIds);
  }, [incomingRequests]);

  useEffect(() => {
    if (users?.length > 0 && incomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (incomingRequests.length === 0) {
      resetUserRequests();
    }
  }, [users, incomingRequests]);

  return loading ? <ContactSkeletons /> : <ContactIncomingContainer requests={userRequests} filter={filter} />;
};

export default ContactIncoming;
