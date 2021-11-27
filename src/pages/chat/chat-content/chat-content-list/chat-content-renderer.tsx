import React, {FC, memo} from 'react';
import ChatContentItem from '../chat-content-item';
import {ChatItemProps} from '../types';
import {chatContentRendererStyles} from './_styles';

type Props = ChatItemProps;

const ChatContentRenderer: FC<Props> = ({data, index, style}: Props) => {
  const classes = chatContentRendererStyles();
  const item = data.items[index];
  const account = data.account;
  const isVisible = data.visibleItems.includes(index);

  return (
    <div className={classes.root} style={style}>
      <ChatContentItem item={item} isVisible={isVisible} account={account} />
    </div>
  );
};

export default memo(ChatContentRenderer);
