import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Theme} from '@material-ui/core';
import UserService from '../../../services/user.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useTranslation} from 'react-i18next';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {User} from '../../../models/user.model';
import {ArrayUtils} from '../../../shared/utils/array.utils';
import UsersSelectItem from './UsersSelectItem';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import {flowRight} from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import ClearableTextInput from '../ClearableTextInput';

type UsersSelectProps = {
  allowedIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelect = ({allowedIds, ignoredIds, setUserIds}: UsersSelectProps) => {
  const classes = usersSelectStyles();
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

    let updatedUsersToShow = filter.length > 0 ? users.filter(filterFunc) : users;
    updatedUsersToShow = updatedUsersToShow
      .filter(filterInFunc(allowedIds))
      .filter(filterNotInFunc(selectedIds))
      .filter(filterNotInFunc(ignoredIds));

    const selectedUsers = users.filter(filterInFunc(selectedIds));
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
    handleUserIds(allowedIds);
  }, [allowedIds]);

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
          <UsersSelectItem
            user={user}
            isSelected={isSelected(user)}
            toggleSelected={toggleSelected(user)}
            key={index}
          />
        ))}
        {usersToShow.length === 0 && <Box className={classes.notFound}>{t('common:usersSelect.usersNotFound')}</Box>}
      </Box>
    </Box>
  );
};

const usersSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  filter: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
  },
  users: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  notFound: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    color: theme.palette.grey['400'],
  },
}));

export default flowRight(withUserList)(UsersSelect);
