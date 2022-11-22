import React, {useState} from 'react';
import {Item} from '../../../../models/Item';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import {useAppDispatch} from '../../../../store/store';
import {useTranslation} from 'react-i18next';
import {GroupActions} from '../../../../store/group/groupActions';
import EyeIcon from '../../../../components/icons/EyeIcon';
import PackageUpIcon from '../../../../components/icons/PackageUpIcon';
import PackageDownIcon from '../../../../components/icons/PackageDownIcon';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import {useNavigate} from 'react-router-dom';
import {IconButton} from '@mui/material';
import PopupMenu, {PopupMenuItem, PopupMenuItemProps} from '../../../../components/surfaces/PopupMenu';
import {ItemRouteUtils} from '../../../../routes/ItemRouter';
import {useItemDialogContext} from '../../../../shared/contexts/dialogContexts/ItemDialogContext';

type GroupItemMenuProps = {
  item: Item;
  canEdit: boolean;
};

const GroupItemMenu = ({item, canEdit}: GroupItemMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {showItemDeleteDialog} = useItemDialogContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToItemView = (): void => navigate(ItemRouteUtils.getViewUrl(item.id));
  const goToItemEdit = (): void => navigate(ItemRouteUtils.getEditUrl(item.id));

  const toggleArchived = (): void => {
    setArchivedLoading(true);
    dispatch(GroupActions.updateItemArchivedThunk(item))
      .unwrap()
      .catch(() => setArchivedLoading(false));
  };

  const openItemDeleteDialog = (): void => {
    showItemDeleteDialog(item);
  };

  const menuItems: PopupMenuItemProps[] = [
    {action: goToItemView, text: t('group:actions.view'), icon: <EyeIcon />, color: 'primary'},
    {
      action: toggleArchived,
      text: item.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      icon: item.archived ? <PackageUpIcon color="primary" /> : <PackageDownIcon />,
      color: 'primary',
      loading: archivedLoading,
      disabled: archivedLoading,
      hidden: !canEdit,
    },
    {action: goToItemEdit, text: t('group:actions.edit'), icon: <EditIcon />, color: 'primary'},
    {action: openItemDeleteDialog, text: t('group:actions.delete'), icon: <DeleteIcon />, color: 'error'},
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

export default GroupItemMenu;
