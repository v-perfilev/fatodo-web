import React, {Dispatch, memo, SetStateAction} from 'react';
import PageHeader from '../../../components/layouts/PageHeader';
import RefreshIcon from '../../../components/icons/RefreshIcon';
import {useTranslation} from 'react-i18next';
import PageMenu, {PageMenuItem} from '../../../components/layouts/PageMenu';
import {useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useNavigate} from 'react-router-dom';
import EditIcon from '../../../components/icons/EditIcon';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import MembersIcon from '../../../components/icons/MembersIcon';
import LeaveIcon from '../../../components/icons/LeaveIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import UrlPic from '../../../components/images/UrlPic';
import {IconButton} from '@mui/material';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useGroupDialogContext} from '../../../shared/contexts/dialogContexts/GroupDialogContext';
import GroupViewArchivedToggler from './GroupViewArchivedToggler';

type GroupViewHeaderProps = {
  refresh: () => void;
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
  toggleCollapsed?: () => void;
};

const GroupViewHeader = ({refresh, showArchived, setShowArchived, toggleCollapsed}: GroupViewHeaderProps) => {
  const group = useAppSelector(GroupSelectors.group);
  const account = useAppSelector(AuthSelectors.account);
  const {showGroupMembersDialog, showGroupLeaveDialog, showGroupDeleteDialog} = useGroupDialogContext();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canEdit = group && GroupUtils.canEdit(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const goToGroupList = (): void => navigate(GroupRouteUtils.getListUrl());
  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group?.id));
  const goToGroupEdit = (): void => navigate(GroupRouteUtils.getEditUrl(group?.id));

  const openGroupMembersDialog = (): void => {
    showGroupMembersDialog(group);
  };

  const openGroupLeaveDialog = (): void => {
    showGroupLeaveDialog(group, goToGroupList);
  };

  const openGroupDeleteDialog = (): void => {
    showGroupDeleteDialog(group, goToGroupList);
  };

  const menuItems: PageMenuItem[] = [
    {
      action: refresh,
      text: t('group:actions.refresh'),
      icon: <RefreshIcon />,
      color: 'primary',
    },
    {
      action: goToItemCreate,
      text: t('group:actions.createItem'),
      icon: <PlusIcon />,
      color: 'primary',
      hidden: !canEdit,
    },
    {
      action: goToGroupEdit,
      text: t('group:actions.edit'),
      icon: <EditIcon />,
      color: 'primary',
      hidden: !canAdmin,
    },
    {
      action: openGroupMembersDialog,
      text: t('group:actions.members'),
      icon: <MembersIcon />,
      color: 'primary',
    },
    {
      action: openGroupLeaveDialog,
      text: t('group:actions.leave'),
      icon: <LeaveIcon />,
      color: 'error',
      hidden: !canLeave,
    },
    {
      action: openGroupDeleteDialog,
      text: t('group:actions.delete'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: !canAdmin,
    },
  ];

  const image = group?.imageFilename && <UrlPic url={group?.imageFilename} />;

  return (
    <PageHeader maxWidth="md" position="absolute" image={image} title={group?.title} goBackAction={goToGroupList}>
      <GroupViewArchivedToggler showArchived={showArchived} setShowArchived={setShowArchived} />
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <CommentsIcon />
        </IconButton>
      )}
      <PageMenu items={menuItems} />
    </PageHeader>
  );
};

export default memo(GroupViewHeader);
