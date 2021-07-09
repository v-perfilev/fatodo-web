import React, {FC, memo} from 'react';
import ChatContentItem from '../chat-content-item';
import {ChatContentItemProps} from './types';
import {areEqual} from 'react-window';
import {chatContentRendererStyles} from './_styles';

type Props = ChatContentItemProps;

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

export default memo(ChatContentRenderer, areEqual);
