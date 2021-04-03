import React, {ChangeEvent, FC} from 'react';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../../common/inputs';
import {chatControlHeaderStyles} from './_styles';
import ChatControlNewChatButton from './chat-control-new-chat-button';
import {useTranslation} from 'react-i18next';

type Props = {
  setFilter: (filter: string) => void;
};

const ChatControlHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = chatControlHeaderStyles();
  const {t} = useTranslation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput placeholder={t('chat:control.filter')} onChange={handleOnChange} fullWidth />
      <ChatControlNewChatButton />
    </Box>
  );
};

export default ChatControlHeader;
