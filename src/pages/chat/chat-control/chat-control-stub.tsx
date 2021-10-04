import React, {FC} from 'react';
import {chatControlStubStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const ChatControlStub: FC = () => {
  const classes = chatControlStubStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('chat:control.chatsNotFound')}</Box>;
};

export default ChatControlStub;
