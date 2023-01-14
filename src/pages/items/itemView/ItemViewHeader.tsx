import React, {useState} from 'react';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import {useTranslation} from 'react-i18next';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenu';
import PageHeader from '../../../components/layouts/PageHeader';
import {useNavigate} from 'react-router-dom';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import {IconButton} from '@mui/material';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {useItemDialogContext} from '../../../shared/contexts/dialogContexts/ItemDialogContext';
import {ItemActions} from '../../../store/item/itemActions';
import PackageUpIcon from '../../../components/icons/PackageUpIcon';
import PackageDownIcon from '../../../components/icons/PackageDownIcon';

type ItemViewHeaderProps = {
  toggleCollapsed?: () => void;
};

const ItemViewHeader = ({toggleCollapsed}: ItemViewHeaderProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const group = useAppSelector(ItemSelectors.group);
  const item = useAppSelector(ItemSelectors.item);
  const {showItemDeleteDialog} = useItemDialogContext();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [archivedLoading, setArchivedLoading] = useState<boolean>(false);

  const goToGroupView = (): void => group && navigate(GroupRouteUtils.getViewUrl(group.id));
  const goToItemEdit = (): void => item && navigate(ItemRouteUtils.getEditUrl(item.id));

  const toggleArchived = (): void => {
    setArchivedLoading(true);
    dispatch(ItemActions.updateItemArchivedThunk(item))
      .unwrap()
      .finally(() => setArchivedLoading(false));
  };

  const openItemDeleteDialog = (): void => {
    const onSuccess = (): void => goToGroupView();
    showItemDeleteDialog(item, onSuccess);
  };

  const canEdit = group && GroupUtils.canAdmin(account, group);

  const menuItems: PageMenuItem[] = [
    {
      action: toggleArchived,
      icon: item?.archived ? <PackageUpIcon color="primary" /> : <PackageDownIcon color="primary" />,
      text: item?.archived ? t('group:actions.removeFromArchive') : t('group:actions.moveToArchive'),
      loading: archivedLoading,
      disabled: archivedLoading,
      hidden: !canEdit,
    },
    {
      action: goToItemEdit,
      text: t('item:actions.edit'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: !canEdit,
    },
    {
      action: openItemDeleteDialog,
      text: t('item:actions.delete'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: !canEdit,
    },
  ];

  return (
    <PageHeader maxWidth="md" title={item?.title} goBackAction={goToGroupView}>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CommentsIcon />
        </IconButton>
      )}
      <PageMenu items={menuItems} />
    </PageHeader>
  );
};

export default ItemViewHeader;
