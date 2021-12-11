import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {permissionSelectStyles} from './_styles';
import csx from 'classnames';
import {GroupPermission} from '../../../models/group.model';
import {useTranslation} from 'react-i18next';

type Props = HTMLAttributes<HTMLElement> & {
  permission: GroupPermission;
  setPermission: (permission: GroupPermission) => void;
};

export const PermissionSelect: FC<Props> = ({permission, setPermission, className}: Props) => {
  const classes = permissionSelectStyles();
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

  const classNames = csx(classes.root, className);
  const readClassNames = csx(classes.selector, {[classes.activeSelector]: permission === 'READ'});
  const editClassNames = csx(classes.selector, {[classes.activeSelector]: permission === 'EDIT'});
  const adminClassNames = csx(classes.selector, {[classes.activeSelector]: permission === 'ADMIN'});

  return (
    <Box className={classNames}>
      <Box className={readClassNames} onClick={selectRead}>
        {t('group:roles.read')}
      </Box>
      <Box className={editClassNames} onClick={selectEdit}>
        {t('group:roles.edit')}
      </Box>
      <Box className={adminClassNames} onClick={selectAdmin}>
        {t('group:roles.admin')}
      </Box>
    </Box>
  );
};
