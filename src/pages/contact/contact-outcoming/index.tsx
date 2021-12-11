import React, {FC, useEffect, useMemo, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactOutcomingContainer from './contact-outcoming-container';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ContactOutcomingItemSkeleton from './contact-outcoming-item-skeleton';
import {CONTACT_SKELETON_COUNT} from '../_constants';

type Props = {
  filter: string;
};

const ContactOutcoming: FC<Props> = ({filter}: Props) => {
  const {outcomingRequests} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(true);

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
    } else if (users && outcomingRequests) {
      resetUserRequests();
    }
  }, [users, outcomingRequests]);

  const indexArray = useMemo(() => Array.from(Array(CONTACT_SKELETON_COUNT).keys()), []);
  const skeletons = indexArray.map((index) => <ContactOutcomingItemSkeleton key={index} />);

  return loading ? <>{skeletons}</> : <ContactOutcomingContainer requests={userRequests} filter={filter} />;
};

export default ContactOutcoming;
