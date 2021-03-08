import {Fab} from '@material-ui/core';
import * as React from 'react';
import {useState} from 'react';
import {messageControlChatButtonStyles} from './_styles';
import {PlusIcon} from '../../common/icons/plus-icon';
import CreateChatDialog from '../create-chat-dialog';


const MessageControlChatButton = () => {
  const classes = messageControlChatButtonStyles();
  const [showCreateChatDialog, setShowCreateChatDialog] = useState<boolean>(false);

  const showDialog = () => {
    setShowCreateChatDialog(true);
  };

  return (
    <>
      <Fab className={classes.root} size="small" color="primary" onClick={showDialog}>
        <PlusIcon />
      </Fab>
      <CreateChatDialog show={showCreateChatDialog} setShow={setShowCreateChatDialog} />
    </>
  );

};

export default MessageControlChatButton;
