import React, {ChangeEvent, Ref, useCallback, useImperativeHandle, useRef, useState} from 'react';
import CloseIcon from '../icons/CloseIcon';
import {IconButton, TextField, TextFieldProps} from '@mui/material';
import {InputUtils} from '../../shared/utils/InputUtils';
import {RefUtils} from '../../shared/utils/RefUtils';

export type ClearableTextInputMethods = {
  clear: () => void;
};

type ClearableTextInputProps = TextFieldProps & {
  disableUnderline?: boolean;
  clearableInputRef?: Ref<ClearableTextInputMethods>;
};

const ClearableTextInput = ({
  onChange,
  inputRef,
  disableUnderline,
  clearableInputRef,
  ...props
}: ClearableTextInputProps) => {
  const ref = useRef<HTMLInputElement>();
  const [showClearButton, setShowClearButton] = useState(false);

  const updateShowClearButton = useCallback((): void => {
    const filterIsNotEmpty = ref.current.value.length > 0;
    setShowClearButton(filterIsNotEmpty);
  }, []);

  const clear = useCallback((event?: React.MouseEvent<HTMLInputElement>): void => {
    event?.stopPropagation();
    updateShowClearButton();
    InputUtils.clear(ref);
  }, []);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
    updateShowClearButton();
  }, []);

  useImperativeHandle(clearableInputRef, (): ClearableTextInputMethods => ({clear}), [clear]);

  const inputProps = {
    endAdornment: showClearButton && (
      <IconButton size="small" onClick={clear}>
        <CloseIcon />
      </IconButton>
    ),
    disableUnderline,
  };

  return (
    <TextField
      variant="standard"
      onChange={handleOnChange}
      inputRef={RefUtils.merge(ref, inputRef)}
      InputProps={inputProps}
      {...props}
    />
  );
};

export default ClearableTextInput;
