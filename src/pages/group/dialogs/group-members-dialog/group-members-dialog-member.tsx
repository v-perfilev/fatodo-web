import React, {FC, useState} from 'react';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {Box, IconButton} from '@material-ui/core';
import {UserWithPopupView} from '../../../../components/views';
import {groupMembersDialogMemberStyles} from './_styles';
import withAuthState from '../../../../shared/hocs/with-auth-state/with-auth-state';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ConfirmationDialog from '../../../../components/dialogs/confirmation-dialog';
import {useTranslation} from 'react-i18next';
import {UserMinusIcon} from '../../../../components/icons/user-minus-icon';
import {Group, GroupUser} from '../../../../models/group.model';
import ItemService from '../../../../services/item.service';
import {PermissionView} from '../../../../components/views/permission-view';
import {GroupUtils} from '../../../../shared/utils/group.utils';
import {EditIcon} from '../../../../components/icons/edit-icon';

type BaseProps = {
  group: Group;
  user: GroupUser;
  switchToEditMember: (user: GroupUser) => void;
};

type Props = AuthState & BaseProps;

const GroupMembersDialogMember: FC<Props> = ({group, user, switchToEditMember, account}: Props) => {
  const classes = groupMembersDialogMemberStyles();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchToEdit = (): void => {
    switchToEditMember(user);
  };

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    ItemService.removeMembersFromGroup(group.id, [user.id])
      .catch((response) => {
        handleResponse(response);
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
      text={t('group:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  return (
    <Box className={classes.userBox}>
      <Box className={classes.user}>
        <UserWithPopupView user={user} withUsername withUserPic picSize="sm" />
        <PermissionView permission={user.permission} />
      </Box>
      {canAdmin && (
        <IconButton size="small" onClick={switchToEdit}>
          <EditIcon color="action" />
        </IconButton>
      )}
      {canAdmin && (
        <IconButton size="small" onClick={switchRemovingConfirmation}>
          <UserMinusIcon color="error" />
        </IconButton>
      )}
      {removingConfirmation}
    </Box>
  );
};

export default withAuthState(GroupMembersDialogMember);