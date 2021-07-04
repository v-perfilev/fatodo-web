import React, {FC, useEffect, useState} from 'react';
import {ContactRequest, ContactRequestWithUser} from '../../../models/contact-request.model';
import ContactService from '../../../services/contact.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import ContactIncomingList from './contact-incoming-list';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {CircularSpinner} from '../../../components/loaders';

const ContactIncoming: FC = () => {
  const {handleResponse} = useSnackContext();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = (): void => {
    setLoading(true);
    ContactService.getIncomingRequests()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((response) => {
        handleResponse(response);
        setLoading(false);
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
        setLoading(false);
      });
  };

  const combineRequestsWithUsers = (): void => {
    const userMap = new Map(users.map((user) => [user.id, user]));
    const userRequests = requests.map((r) => ({...r, user: userMap.get(r.requesterId)})).filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
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

  return loading ? <CircularSpinner /> : <ContactIncomingList requests={userRequests} loadRequests={loadRequests} />;
};

export default ContactIncoming;
