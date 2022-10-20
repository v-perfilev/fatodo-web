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

type GroupViewHeaderProps = {
  refresh: () => void;
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewHeader = ({refresh, showArchived, setShowArchived}: GroupViewHeaderProps) => {
  const group = useAppSelector(GroupSelectors.group);
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const navigate = useNavigate();

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const goToGroupEdit = (): void => navigate(GroupRouteUtils.getEditUrl(group?.id));

  const menuItems: PageMenuItem[] = [
    {
      action: refresh,
      text: t('group:actions.refresh'),
      icon: <RefreshIcon />,
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
      action: console.log,
      text: t('group:actions.members'),
      icon: <MembersIcon />,
      color: 'primary',
    },
    {
      action: console.log,
      text: t('group:actions.leave'),
      icon: <LeaveIcon />,
      color: 'secondary',
      hidden: !canLeave,
    },
    {
      action: console.log,
      text: t('group:actions.delete'),
      icon: <DeleteIcon />,
      color: 'error',
      hidden: !canLeave,
    },
  ];

  return (
    <PageHeader title={group?.title}>
      <PageMenu items={menuItems} />
    </PageHeader>
  );
};

export default memo(GroupViewHeader);
