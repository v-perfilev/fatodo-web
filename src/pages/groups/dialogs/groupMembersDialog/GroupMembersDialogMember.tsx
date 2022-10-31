import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import EditIcon from '../../../../components/icons/EditIcon';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {GroupActions} from '../../../../store/group/groupActions';
import {IconButton} from '@mui/material';
import {PermissionView} from '../../../../components/views/PermissionView';

type Props = {
  group: Group;
  user: GroupUser;
  switchToEditMember: (user: GroupUser) => void;
  onDelete: (userId: string) => void;
};

const GroupMembersDialogMember = ({group, user, switchToEditMember, onDelete}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchToEdit = (): void => {
    switchToEditMember(user);
  };

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const showEditButton = canAdmin && (user.userId !== account.id || canLeave);
  const showRemoveButton = canAdmin && user.userId !== account.id;

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    dispatch(GroupActions.removeGroupMembersThunk({group, userIds: [user.userId]}))
      .unwrap()
      .then(() => {
        onDelete(user.userId);
      })
      .finally(() => {
        setRemovingLoading(false);
        setShowRemovingConfirmation(false);
      });
  };

  const removingConfirmation = (
    <ConfirmationDialog
      open={showRemovingConfirmation}
      title={t('group:removeMember.title')}
      content={t('group:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  return (
    <FHStack>
      <FHStack spacing={1}>
        <UserView user={user} withUsername withUserPic />
        <PermissionView permission={user.permission} />
      </FHStack>
      {showEditButton && (
        <IconButton color="primary" onClick={switchToEdit}>
          <EditIcon />
        </IconButton>
      )}
      {showRemoveButton && (
        <IconButton color="error" onClick={switchRemovingConfirmation}>
          <UserMinusIcon />
        </IconButton>
      )}
      {removingConfirmation}
    </FHStack>
  );
};

export default GroupMembersDialogMember;
