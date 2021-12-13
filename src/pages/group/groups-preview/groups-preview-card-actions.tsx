import React, {FC, MouseEvent, useRef, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {groupsPreviewCardActionsStyles} from './_styles';
import {PopupMenu} from '../../../components/surfaces';
import {useHistory} from 'react-router-dom';
import {GroupRouteUtils} from '../_router';
import {ItemRouteUtils} from '../../item/_router';
import {useGroupListContext} from '../../../shared/contexts/list-contexts/group-list-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useTranslation} from 'react-i18next';
import {useGroupDialogContext} from '../../../shared/contexts/dialog-contexts/group-dialog-context';
import {GroupUtils} from '../../../shared/utils/group.utils';
import {EyeIcon} from '../../../components/icons/eye-icon';
import {EditIcon} from '../../../components/icons/edit-icon';
import {DeleteIcon} from '../../../components/icons/delete-icon';
import {PlusIcon} from '../../../components/icons/plus-icon';
import {UserAccount} from '../../../models/user.model';
import {PopupMenuItem, PopupMenuItemProps} from '../../../components/surfaces/popup-menu/popup-menu-item';

type Props = {
  account: UserAccount;
};

const GroupsPreviewCardActions: FC<Props> = ({account}: Props) => {
  const classes = groupsPreviewCardActionsStyles();
  const history = useHistory();
  const {t} = useTranslation();
  const ref = useRef();
  const {load: loadGroups} = useGroupListContext();
  const {group} = useGroupViewContext();
  const {showGroupDeleteDialog} = useGroupDialogContext();
  const [isOpen, setIsOpen] = useState(false);

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

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

  const menuItems = [
    {action: redirectToItemCreate, icon: <PlusIcon color="primary" />, text: t('group:menu.createItem'), show: canEdit},
    {action: redirectToGroupView, icon: <EyeIcon color="primary" />, text: t('group:menu.viewGroup')},
    {action: redirectToGroupEdit, icon: <EditIcon color="primary" />, text: t('group:menu.editGroup'), show: canAdmin},
    {
      action: openGroupDeleteDialog,
      icon: <DeleteIcon color="error" />,
      text: t('group:menu.deleteGroup'),
      show: canAdmin,
    },
  ] as PopupMenuItemProps[];

  return (
    <>
      <IconButton onClick={handleClickOnAction} className={classes.root} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <Box>
          {menuItems.map((item, index) => (
            <PopupMenuItem action={item.action} icon={item.icon} text={item.text} show={item.show} key={index} />
          ))}
        </Box>
      </PopupMenu>
    </>
  );
};

export default GroupsPreviewCardActions;
