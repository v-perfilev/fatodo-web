import React, {FC, useEffect, useState} from 'react';
import {ContactRequestWithUser} from '../../../models/contact-request.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {CircularSpinner} from '../../../components/loaders';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import ContactOutcomingContainer from './contact-outcoming-container';

type Props = {
  filter: string;
};

const ContactOutcoming: FC<Props> = ({filter}: Props) => {
  const {handleResponse} = useSnackContext();
  const {outcomingRequests: requests, update, loading: requestsLoading} = useContactContext();
  const [users, setUsers] = useState<User[]>([]);
  const [userRequests, setUserRequests] = useState<ContactRequestWithUser[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = (): void => {
    const ids = requests.map((r) => r.recipientId);
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
    const userRequests = requests.map((r) => ({...r, user: userMap.get(r.recipientId)})).filter((r) => r.user);
    setUserRequests(userRequests);
    setLoading(false);
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [requests]);

  useEffect(() => {
    combineRequestsWithUsers();
  }, [users]);

  return loading || requestsLoading ? (
    <CircularSpinner size="sm" />
  ) : (
    <ContactOutcomingContainer requests={userRequests} loadRequests={update} filter={filter} />
  );
};

export default ContactOutcoming;
