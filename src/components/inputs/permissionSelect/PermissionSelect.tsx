import React from 'react';
import {useTranslation} from 'react-i18next';
import {GroupPermission} from '../../../models/Group';
import PermissionSelectItem from './PermissionSelectItem';
import FVStack from '../../boxes/FVStack';

type PermissionSelectProps = {
  permission: GroupPermission;
  setPermission: (permission: GroupPermission) => void;
};

const PermissionSelect = ({permission, setPermission}: PermissionSelectProps) => {
  const {t} = useTranslation();

  const selectRead = (): void => {
    setPermission('READ');
  };

  const selectEdit = (): void => {
    setPermission('EDIT');
  };

  const selectAdmin = (): void => {
    setPermission('ADMIN');
  };

  return (
    <FVStack>
      <PermissionSelectItem title={t('group:roles.read')} active={permission === 'READ'} onClick={selectRead} />
      <PermissionSelectItem title={t('group:roles.edit')} active={permission === 'EDIT'} onClick={selectEdit} />
      <PermissionSelectItem title={t('group:roles.admin')} active={permission === 'ADMIN'} onClick={selectAdmin} />
    </FVStack>
  );
};

export default PermissionSelect;
