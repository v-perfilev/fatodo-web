import React, {FC} from 'react';
import {chatContentFooterInputStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import ReflectableTextInput from '../../../../components/inputs/clearable-text-input/reflectable-text-input';

type Props = {
  send: () => void;
  message: string;
  setMessage: (message: string) => void;
};

const ChatContentFooterInput: FC<Props> = ({send, message, setMessage}: Props) => {
  const classes = chatContentFooterInputStyles();
  const {t} = useTranslation();

  return (
    <ReflectableTextInput
      className={classes.root}
      action={send}
      text={message}
      updateText={setMessage}
      placeholder={t('chat:content.inputPlaceholder')}
    />
  );
};

export default ChatContentFooterInput;
