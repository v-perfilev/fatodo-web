import React, {FC} from 'react';
import {Message} from '../../../models/message.model';
import {messageBoxIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {UserWithPopupView} from '../../common/views';
import {UrlPic} from '../../common/images';

type Props = {
  message: Message,
  user: User
}

const MessageBoxIncoming: FC<Props> = ({message, user}: Props) => {
  const classes = messageBoxIncomingStyles();

  return (
    <Box className={classes.root}>
      <UrlPic className={user.imageFilename} alt={null} url={null} size="lg" border={1} />
      <Box className={classes.message}>
        <Box className={classes.header}>
          <Box className={classes.name}>
            <UserWithPopupView user={user} withUserPic={false} withUsername />
          </Box>
          <Box className={classes.date}>
            {message.createdAt}
          </Box>
        </Box>
        <Box className={classes.body}>
          {message.text}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBoxIncoming;
