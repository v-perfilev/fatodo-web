import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactOutcomingContainer from './contact-outcoming-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ContactSkeletons from '../contact-skeletons/contact-skeletons';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

type Props = {
  filter: string;
};

const ContactOutcoming: FC<Props> = ({filter}: Props) => {
  const {outcomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useLoadingState();

  const resetUserRequests = (): void => {
    setUserRequests([]);
    setLoading(false);
  };

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
    if (users?.length > 0 && outcomingRequests?.length > 0) {
      combineRequestsWithUsers();
    } else if (outcomingRequests?.length === 0) {
      resetUserRequests();
    }
  }, [users, outcomingRequests]);

  return loading ? <ContactSkeletons /> : <ContactOutcomingContainer requests={userRequests} filter={filter} />;
};

export default ContactOutcoming;
