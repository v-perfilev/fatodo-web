import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Chat} from '../../../../models/Chat';
import {User} from '../../../../models/User';
import {ChatActions} from '../../../../store/chat/chatActions';
import {IconButton} from '@mui/material';

type ChatMembersDialogMemberProps = {
  chat: Chat;
  user: User;
};

const ChatMembersDialogMember = ({chat, user}: ChatMembersDialogMemberProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    dispatch(ChatActions.removeChatMemberThunk({chat, userId: user.id}))
      .unwrap()
      .finally(() => {
        setRemovingLoading(false);
        setShowRemovingConfirmation(false);
      });
  };

  const removingConfirmation = (
    <ConfirmationDialog
      open={showRemovingConfirmation}
      title={t('chat:removeMember.title')}
      content={t('chat:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  return (
    <FHStack>
      <FHStack>
        <UserView user={user} withUsername withUserPic />
      </FHStack>
      {chat && !chat.isDirect && user.id !== account.id && (
        <IconButton color="error" size="small" onClick={switchRemovingConfirmation}>
          <UserMinusIcon />
        </IconButton>
      )}
      {removingConfirmation}
    </FHStack>
  );
};

export default ChatMembersDialogMember;
