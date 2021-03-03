import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../models/message.model';
import {messageBoxStyles} from './_styles';
import MessageBoxOutcoming from './message-box-outcoming';
import MessageBoxIncoming from './message-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../models/user.model';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message,
  account: User,
}

const MessageBox: FC<Props> = ({message, account, ...props}: Props) => {
  const classes = messageBoxStyles();

  const isMessageOutcoming = message.userId === account.id;

  return (
    <div className={classes.root}  {...props}>
      {isMessageOutcoming && <MessageBoxOutcoming message={message} />}
      {!isMessageOutcoming && <MessageBoxIncoming message={message} />}
    </div>
  );
};

export default compose(memo)(MessageBox);
