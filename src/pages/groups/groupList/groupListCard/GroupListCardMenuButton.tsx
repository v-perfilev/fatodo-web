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
import {Box, IconButton} from '@mui/material';
import {useGroupDialogContext} from '../../../../shared/contexts/dialogContexts/GroupDialogContext';

type GroupListCardMenuButtonProps = {
  group: Group;
};

const GroupListCardMenuButton = ({group}: GroupListCardMenuButtonProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {showGroupDeleteDialog} = useGroupDialogContext();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const canEdit = group && GroupUtils.canEdit(account, group);
  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const goToGroupView = (): void => navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group.id));
  const goToGroupEdit = (): void => navigate(GroupRouteUtils.getEditUrl(group.id));

  const openGroupDeleteDialog = (): void => {
    showGroupDeleteDialog(group);
  };

  const menuItems: PopupMenuItemProps[] = [
    {
      action: goToItemCreate,
      text: t('group:actions.createItem'),
      icon: <PlusIcon />,
      color: 'primary',
      hidden: !canEdit,
    },
    {
      action: goToGroupView,
      text: t('group:actions.view'),
      icon: <EyeIcon />,
      color: 'primary',
    },
    {
      action: goToGroupEdit,
      text: t('group:actions.edit'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: !canAdmin,
    },
    {
      action: openGroupDeleteDialog,
      text: t('group:actions.delete'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: !canAdmin,
    },
  ];

  return (
    <PopupMenu
      trigger={
        <Box color="white">
          <IconButton color="inherit">
            <DotsVerticalIcon />
          </IconButton>
        </Box>
      }
    >
      {menuItems.map((itemProps, index) => (
        <PopupMenuItem {...itemProps} key={index} />
      ))}
    </PopupMenu>
  );
};

export default GroupListCardMenuButton;
