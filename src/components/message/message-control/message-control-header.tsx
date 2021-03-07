import React, {ChangeEvent, FC} from 'react';
import {Box} from '@material-ui/core';
import {ClearableTextInput} from '../../common/inputs';
import {messageControlHeaderStyles} from './_styles';
import MessageControlChatButton from './message-control-chat-button';
import {useTranslation} from 'react-i18next';

type Props = {
  setFilter: (filter: string) => void;
};

const MessageControlHeader: FC<Props> = ({setFilter}: Props) => {
  const classes = messageControlHeaderStyles();
  const {t} = useTranslation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    setFilter(filter);
  };

  return (
    <Box className={classes.root}>
      <ClearableTextInput
        placeholder={t('message:control.filter')}
        onChange={handleOnChange}
        fullWidth />
      <MessageControlChatButton />
    </Box>
  );

};

export default MessageControlHeader;
