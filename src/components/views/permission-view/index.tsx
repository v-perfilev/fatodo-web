import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {permissionViewStyles} from './_styles';
import csx from 'classnames';
import {GroupPermission} from '../../../models/group.model';
import {useTranslation} from 'react-i18next';

type Props = HTMLAttributes<HTMLElement> & {
  permission: GroupPermission;
};

export const PermissionView: FC<Props> = ({permission, className}: Props) => {
  const classes = permissionViewStyles();
  const {t} = useTranslation();
  const classNames = csx(className, classes.root);

  let title = '';
  if (permission === 'ADMIN') {
    title = t('group:roles.admin');
  } else if (permission === 'EDIT') {
    title = t('group:roles.edit');
  }

  return <Box className={classNames}>{title}</Box>;
};
