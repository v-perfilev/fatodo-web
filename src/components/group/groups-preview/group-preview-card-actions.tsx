import React, {FC, MouseEvent, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {PopupMenu} from '../../common/surfaces';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ItemRouteUtils} from '../../item/_router';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useTranslation} from 'react-i18next';
import {useGroupDialogContext} from '../../../shared/contexts/dialog-contexts/group-dialog-context';

const GroupPreviewCardActions: FC = () => {
  const classes = groupCardActionsStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const ref = useRef();
  const {load: loadGroups} = useGroupListContext();
  const {obj: group} = useGroupViewContext();
  const {showGroupDeleteDialog} = useGroupDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const redirectToItemCreate = (e: MouseEvent<HTMLElement>): void => {
    history.push(ItemRouteUtils.getCreateUrl(group.id));
    handleClose(e);
  };

  const redirectToGroupView = (e: MouseEvent<HTMLElement>): void => {
    history.push(GroupRouteUtils.getViewUrl(group.id));
    handleClose(e);
  };

  const redirectToGroupEdit = (e: MouseEvent<HTMLElement>): void => {
    history.push(GroupRouteUtils.getEditUrl(group.id));
    handleClose(e);
  };

  const openGroupDeleteDialog = (e: MouseEvent<HTMLElement>): void => {
    const onSuccess = (): void => loadGroups();
    showGroupDeleteDialog(group, onSuccess);
    handleClose(e);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} className={classes.root} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectToItemCreate}>{t('group:menu.createItem')}</MenuItem>
        <MenuItem onClick={redirectToGroupView}>{t('group:menu.viewGroup')}</MenuItem>
        <MenuItem onClick={redirectToGroupEdit}>{t('group:menu.editGroup')}</MenuItem>
        <MenuItem onClick={openGroupDeleteDialog}>{t('group:menu.deleteGroup')}</MenuItem>
      </PopupMenu>
    </>
  );
};

export default GroupPreviewCardActions;
