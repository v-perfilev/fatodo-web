import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {IconButton, TextField, TextFieldProps} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';
import {InputUtils} from '../../../../shared/utils/input.utils';
import {RefUtils} from '../../../../shared/utils/ref.utils';

type Props = TextFieldProps;

export const ClearableTextInput: FC<Props> = ({onChange, inputRef, ...props}: Props) => {
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

  return (
    <TextField
      {...props}
      onChange={handleOnChange}
      inputRef={RefUtils.mergeRefs(ref, inputRef)}
      InputProps={{
        endAdornment: showClearButton && (
          <IconButton onClick={clear} size="small">
            <CloseIcon />
          </IconButton>
        ),
      }}
    />
  );
};
