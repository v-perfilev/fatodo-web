import React, {HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {GroupPermission} from '../../models/group.model';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';

type PermissionSelectProps = HTMLAttributes<HTMLElement> & {
  permission: GroupPermission;
  setPermission: (permission: GroupPermission) => void;
};

const PermissionSelect = ({permission, setPermission, className}: PermissionSelectProps) => {
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

const permissionSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  selector: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.grey['400'],
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  activeSelector: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
}));

export default PermissionSelect;
