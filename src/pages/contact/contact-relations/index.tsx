import React, {FC, useEffect, useState} from 'react';
import ContactService from '../../../services/contact.service';
import {ContactRelation, ContactRelationWithUser} from '../../../models/contact-relation.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {CircularSpinner} from '../../../components/loaders';
import UserService from '../../../services/user.service';
import {User} from '../../../models/user.model';
import ContactRelationsContainer from './contact-relations-container';

const ContactRelations: FC = () => {
  const {handleResponse} = useSnackContext();
  const [relations, setRelations] = useState<ContactRelation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userRelations, setUserRelations] = useState<ContactRelationWithUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRelations = (): void => {
    setLoading(true);
    ContactService.getAllRelations()
      .then((response) => {
        setRelations(response.data);
      })
      .catch((response) => {
        handleResponse(response);
        setLoading(false);
      });
  };

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
    loadRelations();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [relations]);

  useEffect(() => {
    combineRelationsWithUsers();
  }, [users]);

  return loading ? (
    <CircularSpinner />
  ) : (
    <ContactRelationsContainer relations={userRelations} loadRelations={loadRelations} />
  );
};

export default ContactRelations;
