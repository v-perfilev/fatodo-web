import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {chatControlMessageOutcomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const ChatControlMessageOutcoming: FC<Props> = ({message}: Props) => {
  const classes = chatControlMessageOutcomingStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <span className={classes.salutation}>{t('salutations.you')}: </span>
      {message.text}
    </Box>
  );
};

export default ChatControlMessageOutcoming;
