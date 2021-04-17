import React, {FC, useState} from 'react';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {User} from '../../../../models/user.model';
import {Box, IconButton} from '@material-ui/core';
import {UserWithPopupView} from '../../../common/views';
import {chatMembersDialogMemberStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import withAuthState from '../../../../shared/hocs/with-auth-state';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ConfirmationDialog from '../../../common/dialogs/confirmation-dialog';
import {useTranslation} from 'react-i18next';
import {UserMinusIcon} from '../../../common/icons/user-minus-icon';
import {compose} from 'recompose';

type BaseProps = {
  chat: Chat;
  user: User;
};

type Props = AuthState & BaseProps;

const ChatMembersDialogMember: FC<Props> = ({chat, user, account}: Props) => {
  const classes = chatMembersDialogMemberStyles();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    ChatService.removeUsersFromChat(chat.id, [user.id])
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setRemovingLoading(false);
        setShowRemovingConfirmation(false);
      });
  };

  chat.isDirect = false;

  const removingConfirmation = (
    <ConfirmationDialog
      open={showRemovingConfirmation}
      title={t('chat:removeMember.title')}
      text={t('chat:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  return (
    <Box className={classes.userBox}>
      <Box className={classes.user}>
        <UserWithPopupView user={user} withUsername withUserPic picSize="sm" />
      </Box>
      {!chat.isDirect && user.id !== account.id && (
        <IconButton size="small" onClick={switchRemovingConfirmation}>
          <UserMinusIcon color="error" />
        </IconButton>
      )}
      {removingConfirmation}
    </Box>
  );
};

export default compose<Props, BaseProps>(withAuthState)(ChatMembersDialogMember);
