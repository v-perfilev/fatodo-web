import React, {HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {GroupPermission} from '../../models/group.model';
import {useTranslation} from 'react-i18next';
import {makeStyles, Theme} from '@material-ui/core/styles';

type PermissionViewProps = HTMLAttributes<HTMLElement> & {
  permission: GroupPermission;
};

const PermissionView = ({permission, className}: PermissionViewProps) => {
  const classes = permissionViewStyles();
  const {t} = useTranslation();

  let title = '';
  if (permission === 'ADMIN') {
    title = t('group:roles.admin');
  } else if (permission === 'EDIT') {
    title = t('group:roles.edit');
  }

  const classNames = csx(className, classes.root);

  return <Box className={classNames}>{title}</Box>;
};

const permissionViewStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.grey['400'],
  },
}));

export default PermissionView;
