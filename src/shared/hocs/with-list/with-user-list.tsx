import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {UserListContext} from '../../contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../contexts/snack-context';
import {ArrayUtils} from '../../utils/array.utils';

const withUserList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);

  const addAbsentUsersByIds = (ids: string[]): void => {
    setLoadingIds((prevState) => [...prevState, ...ids]);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers((users) => {
          const newUsers = [...response.data, ...users];
          const uniqueUsers = newUsers.filter(ArrayUtils.uniqueByIdFilter);
          return [...uniqueUsers];
        });
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoadingIds((prevState) => {
          return prevState.filter((id) => !ids.includes(id));
        });
      });
  };

  const addAbsentUsers = (users: User[]): void => {
    setUsers((previousState) => {
      const newUsers = [...users, ...previousState];
      const uniqueUsers = newUsers.filter(ArrayUtils.uniqueByIdFilter);
      return [...uniqueUsers];
    });
  };

  const loading = loadingIds.length > 0;

  const context = {users, handleUserIds: setIds, handleUsers: addAbsentUsers, loading};

  useEffect(() => {
    if (ids) {
      const cachedIds = users.map((user) => user.id);
      cachedIds.push(...loadingIds);
      const absentIds = ids.filter((id) => !cachedIds.includes(id));
      if (absentIds.length > 0) {
        addAbsentUsersByIds(absentIds);
      }
    }
  }, [ids]);

  return (
    <UserListContext.Provider value={context}>
      <Component {...props} />
    </UserListContext.Provider>
  );
};

export default withUserList;
