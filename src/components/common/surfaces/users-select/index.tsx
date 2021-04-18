import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import UserService from '../../../../services/user.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../../models/user.model';
import {ArrayUtils} from '../../../../shared/utils/array.utils';
import {ClearableTextInput} from '../../inputs';
import {userSelectStyles} from './_styles';
import UserSelectItem from './user-select-item';
import withUserList from '../../../../shared/hocs/with-list/with-user-list';
import {compose} from 'recompose';

type Props = {
  priorityIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelectBase: FC<Props> = ({priorityIds, ignoredIds, setUserIds}: Props) => {
  const classes = userSelectStyles();
  const {users, handleUserIds, handleUsers} = useUserListContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const isSelected = (user: User): boolean => selectedIds.includes(user.id);

  const toggleSelected = (user: User) => (): void => {
    setSelectedIds((prevState) => {
      if (!prevState.includes(user.id)) {
        return [...prevState, user.id];
      } else {
        ArrayUtils.deleteItem(prevState, user.id);
        return [...prevState];
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
          handleUsers(users);
        })
        .catch((response) => {
          handleResponse(response);
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
    <Box className={classes.root}>
      <Box className={classes.filter}>
        <ClearableTextInput placeholder={t('inputs.search')} onChange={handleFilterChange} fullWidth />
      </Box>
      <Box className={classes.users}>
        {usersToShow.map((user, index) => (
          <UserSelectItem user={user} isSelected={isSelected(user)} toggleSelected={toggleSelected(user)} key={index} />
        ))}
        {usersToShow.length === 0 && (
          <Box className={classes.notFound}>
            {t('common:usersSelect.usersNotFound')}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export const UserSelect = compose<Props, Props>(withUserList)(UsersSelectBase);
