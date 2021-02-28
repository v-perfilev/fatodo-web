import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {IconButton, TextField, TextFieldProps} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';

type Props = TextFieldProps;

export const ClearableTextInput: FC<Props> = ({onChange, ...props}: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [showClearButton, setShowClearButton] = useState(false);

  const updateShowClearButton = (): void => {
    const filterIsNotEmpty = inputRef.current.value.length > 0;
    setShowClearButton(filterIsNotEmpty);
  };

  const clear = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(inputRef.current, '');
    const simulatedEvent = new Event('input', {bubbles: true});
    inputRef.current.dispatchEvent(simulatedEvent);
    updateShowClearButton();

  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
    updateShowClearButton();
  };

  return <TextField
    {...props}
    onChange={handleOnChange}
    inputRef={inputRef}
    InputProps={{
      endAdornment: showClearButton && (
        <IconButton onClick={clear} size="small">
          <CloseIcon />
        </IconButton>
      )
    }} />;
};
