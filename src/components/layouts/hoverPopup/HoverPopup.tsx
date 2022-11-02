import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import HoverPopupPopper from './HoverPopupPopper';
import {Box, SxProps} from '@mui/material';

type HoverPopupProps = {
  anchorElement: ReactElement;
  popupElement?: ReactElement;
};

const HoverPopup = ({anchorElement, popupElement}: HoverPopupProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOverBox, setIsOverBox] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);

  const hasPopup = !!popupElement;

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
      <Box sx={anchorStyles(hasPopup)} onMouseOver={onBoxOver} onMouseLeave={onBoxLeave}>
        {anchorElement}
      </Box>
      {hasPopup && (
        <HoverPopupPopper
          anchorEl={anchorEl}
          content={popupElement}
          onMouseOver={onPopoverOver}
          onMouseLeave={onPopoverLeave}
        />
      )}
    </>
  );
};

const anchorStyles = (hasPopup: boolean): SxProps => ({
  cursor: hasPopup ? 'pointer' : 'default',
});

export default HoverPopup;
