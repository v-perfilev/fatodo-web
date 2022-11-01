import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';
import {useTranslation} from 'react-i18next';
import UserViewGroup from './UserViewGroup';
import {Typography} from '@mui/material';

const UserViewGroups = () => {
  const {t} = useTranslation();
  const groups = useAppSelector(UserSelectors.groups);

  return (
    <FVStack>
      <Typography color="primary" fontSize={14} fontWeight="bold">
        {t('user:commonGroups.header')}: {groups.length}
      </Typography>
      {groups.length === 0 && (
        <Typography fontSize={14} color="grey.400">
          {t('user:commonGroups.noCommonGroups')}
        </Typography>
      )}
      {groups.map((group) => (
        <UserViewGroup group={group} key={group.id} />
      ))}
    </FVStack>
  );
};

export default UserViewGroups;
