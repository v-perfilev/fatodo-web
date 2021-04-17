import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import UserService from '../../../../services/user.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {ClearableTextInput} from '../../inputs';
import {compose} from 'recompose';
import withUserList from '../../../../shared/hocs/with-list/with-user-list';

type Props = {
  priorityIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelectBase: FC<Props> = ({priorityIds, ignoredIds, setUserIds}: Props) => {
  const {users, handleUserIds, loading: userLoading} = useUserListContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const loading = userLoading && filterLoading;

  const toggleSelected = (id: string): void => {
    setSelectedIds((prevState) => {
      if (prevState.includes(id)) {
        return [...prevState, id];
      } else {
        ArrayUtils.deleteItem(prevState, id);
        return prevState;
      }
    });
  };

  const handleUsersToShow = (): void => {
    const filterFunc = (user: User): boolean => user.username.toLowerCase().startsWith(filter.toLowerCase());
    const filterInFunc = (ids: string[]) => (user: User): boolean => ids.includes(user.id);
    const filterNotInFunc = (ids: string[]) => (user: User): boolean => !ids.includes(user.id);
    const prioritySortFunc = (ids: string[]) => (u1: User, _): number => ids.includes(u1.id) ? 1 : -1;

    let updatedUsersToShow = [];

    if (filter.length > 0) {
      const filteredUsers = users
        .filter(filterFunc)
        .sort(prioritySortFunc(priorityIds));
      updatedUsersToShow.push(...filteredUsers);
    } else {
      const priorityFilteredUsers = users
        .filter(filterInFunc(priorityIds));
      updatedUsersToShow.push(...priorityFilteredUsers);
    }

    updatedUsersToShow = updatedUsersToShow
      .filter(filterNotInFunc(selectedIds))
      .filter(filterNotInFunc(ignoredIds));

    const selectedUsers = users
      .filter(filterInFunc(selectedIds));
    updatedUsersToShow.push(...selectedUsers);

    setUsersToShow(updatedUsersToShow);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  const loadUserFromFilter = (): void => {
    if (filter.length > 0) {
      UserService.getAllByUsernamePart(filter)
        .then((response) => {
          const users = response.data;
          const ids = users.map((u) => u.id);
          handleUserIds(ids);
        })
        .catch((response) => {
          handleResponse(response);
        })
        .finally(() => {
          setFilterLoading(false);
        });
    }
  };

  useEffect(() => {
    handleUserIds(priorityIds);
  }, [priorityIds]);

  useEffect(() => {
    loadUserFromFilter();
  }, [filter]);

  useEffect(() => {
    setUserIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    handleUsersToShow();
  }, [users, selectedIds, ignoredIds, filter]);

  return (
    <Box>
      <ClearableTextInput onChange={handleFilterChange} fullWidth />
      {usersToShow.map((user, index) => (
        <Box key={index}>
          {user.username} - {selectedIds.includes(user.id) ? '!' : '-'}
        </Box>
      ))}
    </Box>
  );
};
export const UserSelect = compose<Props, Props>(withUserList)(UsersSelectBase);
