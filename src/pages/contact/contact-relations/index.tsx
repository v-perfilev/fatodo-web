import React, {FC, useEffect, useMemo, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import ContactRelationsContainer from './contact-relations-container';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ContactRelationsItemSkeleton from './contact-relations-item-skeleton';
import {CONTACT_SKELETON_COUNT} from '../_constants';

type Props = {
  filter: string;
};

const ContactRelations: FC<Props> = ({filter}: Props) => {
  const {relations} = useContactContext();
  const {users, handleUserIds} = useUserListContext();
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useState(true);

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
    } else if (users && relations) {
      resetUserRelations();
    }
  }, [users, relations]);

  const indexArray = useMemo(() => Array.from(Array(CONTACT_SKELETON_COUNT).keys()), []);
  const skeletons = indexArray.map((index) => <ContactRelationsItemSkeleton key={index} />);

  return loading ? <>{skeletons}</> : <ContactRelationsContainer relations={userRelations} filter={filter} />;
};

export default ContactRelations;
