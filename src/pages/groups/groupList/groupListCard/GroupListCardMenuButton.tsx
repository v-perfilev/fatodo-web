import React from 'react';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useTranslation} from 'react-i18next';
import PlusIcon from '../../../../components/icons/PlusIcon';
import EyeIcon from '../../../../components/icons/EyeIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import PopupMenu, {PopupMenuItem, PopupMenuItemProps} from '../../../../components/surfaces/PopupMenu';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {IconButton} from '@mui/material';

type GroupListCardMenuButtonProps = {
  group: Group;
};

const GroupListCardMenuButton = ({group}: GroupListCardMenuButtonProps) => {
  const account = useAppSelector(AuthSelectors.account);
  // const {showGroupDeleteDialog} = useGroupDialogContext();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToGroupView = (): void => navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group.id));
  const goToGroupEdit = (): void => navigate(GroupRouteUtils.getEditUrl(group.id));

  const openGroupDeleteDialog = (): void => {
    // showGroupDeleteDialog(group);
  };

  const menuItems: PopupMenuItemProps[] = [
    {
      action: goToItemCreate,
      icon: <PlusIcon color="primary" />,
      text: t('group:menu.createItem'),
      hidden: !canEdit,
    },
    {
      action: goToGroupView,
      icon: <EyeIcon color="primary" />,
      text: t('group:menu.viewGroup'),
    },
    {
      action: goToGroupEdit,
      icon: <EditIcon color="primary" />,
      text: t('group:menu.editGroup'),
      hidden: !canAdmin,
    },
    {
      action: openGroupDeleteDialog,
      icon: <DeleteIcon color="error" />,
      text: t('group:menu.deleteGroup'),
      hidden: !canAdmin,
    },
  ];

  return (
    <PopupMenu
      trigger={
        <IconButton>
          <DotsVerticalIcon color="primary" />
        </IconButton>
      }
    >
      {menuItems.map((itemProps, index) => (
        <PopupMenuItem {...itemProps} key={index} />
      ))}
    </PopupMenu>
  );
};

export default GroupListCardMenuButton;
