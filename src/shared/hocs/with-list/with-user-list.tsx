import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {UserListContext} from '../../contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../contexts/snack-context';

const withUserList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [users, setUsers] = useState<User[]>([]);
  const [ids, setIds] = useState<string[]>([]);

  const addAbsentUsers = (ids: string[]): void => {
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers((users) => {
          const newUsers = [...response.data, ...users];
          const newSet = new Set<User>(newUsers);
          return [...newSet];
        });
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const context = {users, addIds: setIds};

  useEffect(() => {
    const cachedIds = users.map((user) => user.id);
    const absentIds = ids.filter((id) => !cachedIds.includes(id));
    if (absentIds.length > 0) {
      addAbsentUsers(absentIds);
    }
  }, [ids]);

  return (
    <UserListContext.Provider value={context}>
      <Component {...props} />
    </UserListContext.Provider>
  );
};

export default withUserList;
