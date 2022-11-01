import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import HoverPopupPopper from './HoverPopupPopper';
import {Box, SxProps} from '@mui/material';

type HoverPopupProps = {
  anchorElement: ReactElement;
  popupElement: ReactElement;
};

const HoverPopup = ({anchorElement, popupElement}: HoverPopupProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOverBox, setIsOverBox] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);

  const onBoxOver = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    setIsOverBox(true);
    setAnchorEl(event.currentTarget);
  }, []);

  const onBoxLeave = useCallback((): void => {
    window.setTimeout(() => setIsOverBox(false), 50);
  }, []);

  const onPopoverOver = useCallback((): void => {
    setIsOverPopover(true);
  }, []);

  const onPopoverLeave = useCallback((): void => {
    window.setTimeout(() => setIsOverPopover(false), 500);
  }, []);

  const clearAnchor = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  useEffect(() => {
    if (!isOverBox && !isOverPopover) {
      clearAnchor();
    }
  }, [isOverBox, isOverPopover]);

  return (
    <>
      <Box sx={anchorStyles} onMouseOver={onBoxOver} onMouseLeave={onBoxLeave}>
        {anchorElement}
      </Box>
      <HoverPopupPopper
        anchorEl={anchorEl}
        content={popupElement}
        onMouseOver={onPopoverOver}
        onMouseLeave={onPopoverLeave}
      />
    </>
  );
};

const anchorStyles: SxProps = {
  cursor: 'pointer',
};

export default HoverPopup;
