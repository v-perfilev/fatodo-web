import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';
import {useTranslation} from 'react-i18next';
import UserViewRelation from './UserViewRelation';
import {Typography} from '@mui/material';

const UserViewGroups = () => {
  const {t} = useTranslation();
  const relations = useAppSelector(UserSelectors.relations);

  return (
    <FVStack>
      <Typography color="primary" fontSize={14} fontWeight="bold">
        {t('user:commonContacts.header')}: {relations.length}
      </Typography>
      {relations.length === 0 && (
        <Typography fontSize={14} color="grey.400">
          {t('user:commonContacts.noCommonContacts')}
        </Typography>
      )}
      {relations.map((relation) => (
        <UserViewRelation relation={relation} key={relation.id} />
      ))}
    </FVStack>
  );
};

export default UserViewGroups;
