import {Fab} from '@material-ui/core';
import * as React from 'react';
import {messageControlChatButtonStyles} from './_styles';
import {PlusIcon} from '../../common/icons/plus-icon';


const MessageControlChatButton = () => {
  const classes = messageControlChatButtonStyles();

  const showDialog = () => {
    console.log('show new dialog');
  };

  return (
    <Fab className={classes.root} size="small" color="primary" onClick={showDialog}>
      <PlusIcon />
    </Fab>
  );

};

export default MessageControlChatButton;
