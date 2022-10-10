import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {chatContentStubStyles} from './_styles';

const ChatContentStub: FC = () => {
  const classes = chatContentStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('chat:content.messagesNotFound')}</Box>;
};

export default ChatContentStub;
