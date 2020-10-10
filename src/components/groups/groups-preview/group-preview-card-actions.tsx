import * as React from 'react';
import {FC, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {PopupMenu} from '../../common/surfaces/popup-menu';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ItemRouteUtils} from '../../item/_router';
import {useGroupListContext} from '../../../shared/contexts/group-list-context';
import {useGroupDeleteContext} from '../../../shared/contexts/group-delete-context';
import {useGroupViewContext} from '../../../shared/contexts/group-view-context';
import {useTranslation} from 'react-i18next';

const GroupPreviewCardActions: FC = () => {
  const classes = groupCardActionsStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const {loadGroups} = useGroupListContext();
  const {group} = useGroupViewContext();
  const {setGroupToDelete, setOnDeleteGroupSuccess} = useGroupDeleteContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(null);
  };

  const redirectToItemCreate = (e: React.MouseEvent<HTMLElement>): void => {
    history.push(ItemRouteUtils.getCreateUrl(group.id));
    handleClose(e);
  };

  const redirectToGroupView = (e: React.MouseEvent<HTMLElement>): void => {
    history.push(GroupRouteUtils.getViewUrl(group.id));
    handleClose(e);
  };

  const redirectToGroupEdit = (e: React.MouseEvent<HTMLElement>): void => {
    history.push(GroupRouteUtils.getEditUrl(group.id));
    handleClose(e);
  };

  const openDeleteDialog = (e: React.MouseEvent<HTMLElement>): void => {
    setOnDeleteGroupSuccess(() => (): void => loadGroups());
    setGroupToDelete(group);
    handleClose(e);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} className={classes.action}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={anchorEl} isOpen={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectToItemCreate}>{t('groups:menu.createItem')}</MenuItem>
        <MenuItem onClick={redirectToGroupView}>{t('groups:menu.viewGroup')}</MenuItem>
        <MenuItem onClick={redirectToGroupEdit}>{t('groups:menu.editGroup')}</MenuItem>
        <MenuItem onClick={openDeleteDialog}>{t('groups:menu.deleteGroup')}</MenuItem>
      </PopupMenu>
    </>
  );
};

export default GroupPreviewCardActions;
