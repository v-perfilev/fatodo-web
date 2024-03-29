import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../models/User';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import ClearableTextInput from '../ClearableTextInput';
import UsersSelectItem from './UsersSelectItem';
import FVStack from '../../boxes/FVStack';
import FCenter from '../../boxes/FCenter';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import {InfoActions} from '../../../store/info/infoActions';
import UserService from '../../../services/UserService';
import {Typography} from '@mui/material';

type Props = {
  contactIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelect: FC<Props> = ({contactIds, setUserIds}: Props) => {
  const dispatch = useAppDispatch();
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const users = useAppSelector((state) => usersSelector(state, contactIds));
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
        prevState = ArrayUtils.deleteValue(prevState, user.id);
        return [...prevState];
      }
    });
  };

  const handleUsersToShow = (): void => {
    const idsToShow = contactIds.filter((id) => !selectedIds.includes(id));
    const updatedUsersToShow = users.filter((u) => idsToShow.includes(u.id));
    const selectedUsers = users.filter((u) => selectedIds.includes(u.id));
    updatedUsersToShow.push(...selectedUsers);
    setUsersToShow(updatedUsersToShow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFilter(value);
  };

  const loadUserFromFilter = (): void => {
    if (filter.length > 0) {
      UserService.getAllByUsernamePart(filter).then((response) => dispatch(InfoActions.handleUsers(response.data)));
    }
  };

  useEffect(() => {
    if (users.length !== contactIds.length) {
      const handleUserIds = async () => dispatch(InfoActions.handleUserIdsThunk(contactIds));
      handleUserIds().finally();
    }
  }, [contactIds]);

  useEffect(() => {
    loadUserFromFilter();
  }, [filter]);

  useEffect(() => {
    setUserIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    users.length > 0 && handleUsersToShow();
  }, [users, selectedIds, filter]);

  return (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.search')} onChange={handleChange} />
      {usersToShow.length > 0 && (
        <FVStack>
          {usersToShow.map((user, index) => (
            <UsersSelectItem
              user={user}
              isSelected={isSelected(user)}
              toggleSelected={toggleSelected(user)}
              key={index}
            />
          ))}
        </FVStack>
      )}
      {users.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('common:usersSelect.contactsNotFound')}
          </Typography>
        </FCenter>
      )}
      {users.length > 0 && usersToShow.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('common:usersSelect.usersNotFound')}
          </Typography>
        </FCenter>
      )}
    </FVStack>
  );
};
export default memo(UsersSelect);
