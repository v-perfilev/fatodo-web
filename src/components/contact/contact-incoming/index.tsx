import React, {FC, useEffect, useState} from 'react';
import {ContactRequest, ContactRequestWithUser} from '../../../models/contact-request.model';
import ContactService from '../../../services/contact.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import ContactIncomingList from './contact-incoming-list';
import {Container} from '@material-ui/core';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';

const ContactIncoming: FC = () => {
  const {handleResponse} = useSnackContext();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);

  const loadRequests = (): void => {
    ContactService.getIncomingRequests()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const loadUsers = (): void => {
    const ids = requests.map((r) => r.requesterId);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = requests.map((r) => ({...r, user: userMap.get(r.requesterId)})).filter((r) => r.user);
    setUserRequests(userRequests);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [requests]);

  useEffect(() => {
    combineRequestsWithUsers();
  }, [users]);

  return (
    <Container maxWidth="md">
      <ContactIncomingList requests={userRequests} loadRequests={loadRequests} />
    </Container>
  );
};

export default ContactIncoming;
