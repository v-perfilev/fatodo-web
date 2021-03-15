import React, {ChangeEvent, FC, KeyboardEvent, useRef} from 'react';
import {ClearableTextInput} from '../../common/inputs';
import {messageContentInputStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {InputUtils} from '../../../shared/utils/input.utils';

type Props = {
  send: () => void;
  setMessage: (message: string) => void;
};

const MessageContentInput: FC<Props> = ({send, setMessage}: Props) => {
  const classes = messageContentInputStyles();
  const ref = useRef<HTMLInputElement>();
  const {t} = useTranslation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    setMessage(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isHelpKeyPressed = event.ctrlKey || event.altKey || event.shiftKey;
    const isEnterKeyPressed = event.key === 'Enter';

    if (isEnterKeyPressed && !isHelpKeyPressed) {
      event.preventDefault();
      send();
      InputUtils.clear(ref);
    }
  };

  return (
    <ClearableTextInput className={classes.root}
                        placeholder={t('message:content.inputPlaceholder')}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        inputRef={ref}
                        onKeyPress={handleKeyPress}
                        onChange={handleOnChange} />
  );

};

export default MessageContentInput;
