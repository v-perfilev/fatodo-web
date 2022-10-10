import React, {ChangeEvent, useRef, useState} from 'react';
import {IconButton, TextField, TextFieldProps} from '@material-ui/core';
import CloseIcon from '../icons/CloseIcon';
import {InputUtils} from '../../shared/utils/input.utils';
import {RefUtils} from '../../shared/utils/ref.utils';

const ClearableTextInput = ({onChange, inputRef, ...props}: TextFieldProps) => {
  const ref = useRef<HTMLInputElement>();
  const [showClearButton, setShowClearButton] = useState(false);

  const updateShowClearButton = (): void => {
    const filterIsNotEmpty = ref.current.value.length > 0;
    setShowClearButton(filterIsNotEmpty);
  };

  const clear = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    updateShowClearButton();
    InputUtils.clear(ref);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
    updateShowClearButton();
  };

  const inputProps = {
    endAdornment: showClearButton && (
      <IconButton onClick={clear} size="small">
        <CloseIcon />
      </IconButton>
    ),
  };

  return (
    <TextField
      {...props}
      onChange={handleOnChange}
      inputRef={RefUtils.mergeRefs(ref, inputRef)}
      InputProps={inputProps}
    />
  );
};

export default ClearableTextInput;
