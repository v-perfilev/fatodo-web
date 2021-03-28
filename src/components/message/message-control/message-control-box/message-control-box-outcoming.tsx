import React, {FC} from 'react';
import {Message} from '../../../../models/message.model';
import {messageControlBoxOutcomingStyles} from './_styles';
import {Box} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

type Props = {
  message: Message;
};

const MessageControlBoxOutcoming: FC<Props> = ({message}: Props) => {
  const classes = messageControlBoxOutcomingStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root}>
      <span className={classes.salutation}>{t('salutations.you')}: </span>
      {message.text}
    </Box>
  );
};

export default MessageControlBoxOutcoming;
