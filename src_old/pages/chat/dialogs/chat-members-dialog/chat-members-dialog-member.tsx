import React, {FC, useState} from 'react';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {User} from '../../../../models/user.model';
import {Box, IconButton} from '@material-ui/core';
import {UserView} from '../../../../components/views';
import {chatMembersDialogMemberStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import withAuthState from '../../../../shared/hocs/with-auth-state/with-auth-state';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import ConfirmationDialog from '../../../../components/dialogs/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {UserMinusIcon} from '../../../../components/icons/UserMinusIcon';

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
    <Box className={classes.root}>
      <Box className={classes.user}>
        <UserView user={user} withUsername withUserPic picSize="sm" />
      </Box>
      {chat && !chat.isDirect && user.id !== account.id && (
        <IconButton size="small" onClick={switchRemovingConfirmation}>
          <UserMinusIcon color="error" />
        </IconButton>
      )}
      {removingConfirmation}
    </Box>
  );
};

export default withAuthState(ChatMembersDialogMember);
