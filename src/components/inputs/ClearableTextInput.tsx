import React, {ChangeEvent, useRef, useState} from 'react';
import CloseIcon from '../icons/CloseIcon';
import {IconButton, TextField, TextFieldProps} from '@mui/material';
import {InputUtils} from '../../shared/utils/InputUtils';
import {RefUtils} from '../../shared/utils/RefUtils';

type ClearableTextInputProps = TextFieldProps & {
  disableUnderline?: boolean;
};

const ClearableTextInput = ({onChange, inputRef, disableUnderline, ...props}: ClearableTextInputProps) => {
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
      <IconButton size="small" onClick={clear}>
        <CloseIcon />
      </IconButton>
    ),
    disableUnderline,
  };

  return (
    <TextField onChange={handleOnChange} inputRef={RefUtils.merge(ref, inputRef)} InputProps={inputProps} {...props} />
  );
};

export default ClearableTextInput;
