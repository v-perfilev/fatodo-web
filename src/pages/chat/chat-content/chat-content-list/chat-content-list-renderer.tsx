import React, {FC, memo} from 'react';
import ChatContentItem from '../chat-content-item/chat-content-item';
import {ChatItemProps} from '../types';
import {chatContentListRendererStyles} from './_styles';

type Props = ChatItemProps;

const ChatContentListRenderer: FC<Props> = ({data, index, style}: Props) => {
  const classes = chatContentListRendererStyles();
  const item = data.items[index];
  const account = data.account;
  const isVisible = data.visibleItems.includes(index);

  return (
    <div className={classes.root} style={style}>
      <ChatContentItem item={item} isVisible={isVisible} account={account} />
    </div>
  );
};

export default memo(ChatContentListRenderer);
