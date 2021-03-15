import React, {FC} from 'react';
import {Message} from '../../../models/message.model';
import {messageBoxIncomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {UrlPic} from '../../common/images';
import {DateFormatters} from '../../../shared/utils/date.utils';

type Props = {
  message: Message,
  user: User
}

const MessageBoxIncoming: FC<Props> = ({message, user}: Props) => {
  const classes = messageBoxIncomingStyles();

  const date = DateFormatters.formatTimeAndDateWithYear(new Date(message.createdAt));

  return (
    <Box className={classes.root}>
      <UrlPic className={user.imageFilename} alt={user.username} url={user.imageFilename} size="lg" border={1} />
      <Box className={classes.message}>
        <Box className={classes.header}>
          <Box className={classes.name}>
            {user.username}
          </Box>
          <Box className={classes.date}>
            {date}
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
