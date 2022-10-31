import React from 'react';
import {useTranslation} from 'react-i18next';
import {GroupPermission} from '../../models/Group';
import {Typography} from '@mui/material';

type PermissionViewProps = {
  permission: GroupPermission;
};

export const PermissionView = ({permission}: PermissionViewProps) => {
  const {t} = useTranslation();

  let title = '';
  if (permission === 'ADMIN') {
    title = t('group:roles.admin');
  } else if (permission === 'EDIT') {
    title = t('group:roles.edit');
  }

  return (
    <Typography color="grey.400" fontSize={12}>
      {title}
    </Typography>
  );
};
