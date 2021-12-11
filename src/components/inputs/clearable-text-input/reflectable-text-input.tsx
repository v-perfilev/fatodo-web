import {ClearableTextInput} from './clearable-text-input';
import React, {ChangeEvent, FC, HTMLAttributes, KeyboardEvent, useEffect, useRef} from 'react';
import {InputUtils} from '../../../shared/utils/input.utils';
import {TextFieldProps} from '@material-ui/core';
import {RefUtils} from '../../../shared/utils/ref.utils';

type Props = HTMLAttributes<HTMLElement> &
  TextFieldProps & {
    placeholder: string;
    action: () => void;
    text: string;
    updateText: (text: string) => void;
  };

const ReflectableTextInput: FC<Props> = ({placeholder, action, text, updateText, inputRef, className}: Props) => {
  const ref = useRef<HTMLInputElement>();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;
    updateText(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    const isHelpKeyPressed = event.ctrlKey || event.altKey || event.shiftKey;
    const isEnterKeyPressed = event.key === 'Enter';

    if (isEnterKeyPressed && !isHelpKeyPressed) {
      event.preventDefault();
      action();
      InputUtils.clear(ref);
    }
  };

  useEffect(() => {
    if (text === '') {
      InputUtils.clear(ref);
    }
  }, [text]);

  return (
    <ClearableTextInput
      className={className}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      multiline
      rows={1}
      inputRef={RefUtils.mergeRefs(ref, inputRef)}
      onKeyPress={handleKeyPress}
      onChange={handleOnChange}
    />
  );
};

export default ReflectableTextInput;
