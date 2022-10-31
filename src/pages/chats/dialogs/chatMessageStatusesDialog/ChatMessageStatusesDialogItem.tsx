import React from 'react';
import UserView from '../../../../components/views/UserView';
import {User} from '../../../../models/User';

type ChatMessageStatusesDialogItemProps = {
  user: User;
};

const ChatMessageStatusesDialogItem = ({user}: ChatMessageStatusesDialogItemProps) => {
  return <UserView user={user} withUsername withUserPic />;
};

export default ChatMessageStatusesDialogItem;
