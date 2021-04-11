import React, {FC, useRef, useState} from 'react';
import {Box, IconButton} from '@material-ui/core';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import {MembersIcon} from '../../../common/icons/members-icon';
import ChatContentMembersDialog from './chat-content-members-dialog';
import {chatContentMembers} from './_styles';

type Props = {
  chat: Chat;
};

const ChatContentMembers: FC<Props> = ({chat}: Props) => {
  const classes = chatContentMembers();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} ref={ref}>
        <MembersIcon color="primary" />
        <Box className={classes.memberCount}>
          {chat.members.length}
        </Box>
      </IconButton>
      <ChatContentMembersDialog chat={chat} isOpen={isOpen} close={handleClose} />
    </>
  );
};

export default ChatContentMembers;
