import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {chatContentPlaceholderStyles} from './_styles';

const ChatContentPlaceholder: FC = () => {
  const classes = chatContentPlaceholderStyles();
  const {t} = useTranslation();

  return <Box className={classes.root}>{t('chat:content.placeholder')}</Box>;
};

export default ChatContentPlaceholder;
