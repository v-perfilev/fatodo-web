import React, {FC, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/contact-relation.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {CircularSpinner} from '../../../components/loaders';
import UserService from '../../../services/user.service';
import {User} from '../../../models/user.model';
import ContactRelationsContainer from './contact-relations-container';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';

type Props = {
  filter: string;
};

const ContactRelations: FC<Props> = ({filter}: Props) => {
  const {handleResponse} = useSnackContext();
  const {relations, update, loading: relationsLoading} = useContactContext();
  const [users, setUsers] = useState<User[]>([]);
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = (): void => {
    const ids = relations.map((r) => r.secondUserId);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
        setLoading(false);
      });
  };

  const combineRelationsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRelations = relations.map((r) => ({...r, user: userMap.get(r.secondUserId)})).filter((r) => r.user);
    setUserRelations(userRelations);
    setLoading(false);
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [relations]);

  useEffect(() => {
    combineRelationsWithUsers();
  }, [users]);

  return loading || relationsLoading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ContactRelationsContainer relations={userRelations} loadRelations={update} filter={filter} />
  );
};

export default ContactRelations;
