import React, {FC, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import ContactRelationsContainer from './contact-relations-container';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ContactSkeletons from '../contact-skeletons/contact-skeletons';
import {useLoadingState} from '../../../shared/hooks/use-loading-state';

type Props = {
  filter: string;
};

const ContactRelations: FC<Props> = ({filter}: Props) => {
  const {relations} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useLoadingState();

  const resetUserRelations = (): void => {
    setUserRelations([]);
    setLoading(false);
  };

  const combineRelationsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRelations = relations
      .filter((r) => userMap.has(r.secondUserId))
      .map((r) => ({...r, user: userMap.get(r.secondUserId)}))
      .filter((r) => r.user);
    setUserRelations(userRelations);
    setLoading(false);
  };

  useEffect(() => {
    const userIds = relations.map((r) => r.secondUserId);
    handleUserIds(userIds);
  }, [relations]);

  useEffect(() => {
    if (users?.length > 0 && relations?.length > 0) {
      combineRelationsWithUsers();
    } else if (relations?.length === 0) {
      resetUserRelations();
    }
  }, [relations, users]);

  return loading ? <ContactSkeletons /> : <ContactRelationsContainer relations={userRelations} filter={filter} />;
};

export default ContactRelations;
