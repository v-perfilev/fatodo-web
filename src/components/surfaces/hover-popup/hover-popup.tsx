import * as React from 'react';
import {ComponentType, FC, HTMLAttributes, useCallback, useEffect, useMemo, useState} from 'react';
import {HoverPopupPopper, PopupContentComponentProps} from './hover-popup-popper';
import {hoverPopupStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  AnchorComponent: FC<HTMLAttributes<HTMLElement>>;
  PopupComponent: ComponentType<PopupContentComponentProps>;
};

export const HoverPopup: FC<Props> = ({AnchorComponent, PopupComponent}: Props) => {
  const classes = hoverPopupStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOverBox, setIsOverBox] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);

  const onBoxOver = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
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

  const close = useCallback((): void => {
    setIsOverBox(false);
    setIsOverPopover(false);
  }, []);

  useEffect(() => {
    if (!isOverBox && !isOverPopover) {
      clearAnchor();
    }
  }, [isOverBox, isOverPopover]);

  const anchor = useMemo(
    () => <AnchorComponent onMouseOver={onBoxOver} onMouseLeave={onBoxLeave} className={classes.root} />,
    [],
  );

  return (
    <>
      {anchor}
      <HoverPopupPopper
        anchorEl={anchorEl}
        ContentComponent={PopupComponent}
        onMouseOver={onPopoverOver}
        onMouseLeave={onPopoverLeave}
        closePopup={close}
      />
    </>
  );
};
