import {ClearableTextInput} from './index';
import React, {ChangeEvent, FC, HTMLAttributes, KeyboardEvent, useRef} from 'react';
import {InputUtils} from '../../../shared/utils/input.utils';

type Props = HTMLAttributes<HTMLElement> & {
  placeholder: string;
  action: () => void;
  updateText: (text: string) => void;
};

const ReflectableTextInput: FC<Props> = ({placeholder, action, updateText, className}: Props) => {
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

  return (
    <ClearableTextInput
      className={className}
      placeholder={placeholder}
      fullWidth
      variant="outlined"
      multiline
      rows={1}
      inputRef={ref}
      onKeyPress={handleKeyPress}
      onChange={handleOnChange}
    />
  );
};

export default ReflectableTextInput;