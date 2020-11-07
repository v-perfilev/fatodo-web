import * as React from 'react';
import {FC, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {DotsVerticalIcon} from '../../common/icons/dots-vertical-icon';
import {groupCardActionsStyles} from './_styles';
import {PopupMenu} from '../../common/surfaces/popup-menu';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ItemRouteUtils} from '../../item/_router';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {useGroupDeleteContext} from '../../../shared/contexts/delete-contexts/group-delete-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useTranslation} from 'react-i18next';

const GroupPreviewCardActions: FC = () => {
  const classes = groupCardActionsStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const ref = useRef();
  const {load: loadGroups} = useGroupListContext();
  const {obj: group} = useGroupViewContext();
  const {setObj: setGroupToDelete, setOnSuccess: setOnDeleteGroupSuccess} = useGroupDeleteContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
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
      <IconButton onClick={handleClickOnAction} className={classes.action} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectToItemCreate}>{t('group:menu.createItem')}</MenuItem>
        <MenuItem onClick={redirectToGroupView}>{t('group:menu.viewGroup')}</MenuItem>
        <MenuItem onClick={redirectToGroupEdit}>{t('group:menu.editGroup')}</MenuItem>
        <MenuItem onClick={openDeleteDialog}>{t('group:menu.deleteGroup')}</MenuItem>
      </PopupMenu>
    </>
  );
};

export default GroupPreviewCardActions;
