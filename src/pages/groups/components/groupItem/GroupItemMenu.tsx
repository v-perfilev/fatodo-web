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

type GroupItemMenuProps = {
  item: Item;
  canEdit: boolean;
};

const GroupItemMenu = ({item, canEdit}: GroupItemMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  // const {showItemDeleteDialog} = useItemDialogContext();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToItemView = (): void => navigate(ItemRouteUtils.getViewUrl(item.id));
  const goToItemEdit = (): void => navigate(ItemRouteUtils.getEditUrl(item.id));

  const deleteItem = (item: Item): void => {
    dispatch(GroupActions.removeItemThunk(item));
  };

  const toggleArchived = (): void => {
    setArchivedLoading(true);
    dispatch(GroupActions.updateItemArchivedThunk(item))
      .unwrap()
      .catch(() => setArchivedLoading(false));
  };

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => deleteItem(item);
    // showItemDeleteDialog(item, onSuccess);
  };

  const menuItems: PopupMenuItemProps[] = [
    {action: goToItemView, icon: <EyeIcon color="primary" />, text: t('group:actions.view')},
    {
      action: toggleArchived,
      icon: item.archived ? <PackageUpIcon color="primary" /> : <PackageDownIcon color="primary" />,
      text: item.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      hidden: !canEdit,
    },
    {action: goToItemEdit, icon: <EditIcon color="primary" />, text: t('group:actions.edit')},
    {action: openItemDeleteDialog, icon: <DeleteIcon color="error" />, text: t('group:actions.delete')},
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
