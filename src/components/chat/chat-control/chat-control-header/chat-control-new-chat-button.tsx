import {Fab} from '@material-ui/core';
import * as React from 'react';
import {FC, useState} from 'react';
import {chatControlNewChatButtonStyles} from './_styles';
import {PlusIcon} from '../../../common/icons/plus-icon';
import ChatCreateDialog from '../../dialogs/chat-create-dialog';

const ChatControlNewChatButton: FC = () => {
  const classes = chatControlNewChatButtonStyles();
  const [showCreateChatDialog, setShowCreateChatDialog] = useState<boolean>(false);

  const showDialog = (): void => {
    setShowCreateChatDialog(true);
  };

  const closeDialog = (): void => {
    setShowCreateChatDialog(false);
  };

  return (
    <>
      <Fab className={classes.root} size="small" color="primary" onClick={showDialog}>
        <PlusIcon />
      </Fab>
      <ChatCreateDialog isOpen={showCreateChatDialog} close={closeDialog} />
    </>
  );
};

export default ChatControlNewChatButton;
