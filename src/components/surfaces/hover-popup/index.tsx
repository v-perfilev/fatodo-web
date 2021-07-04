import * as React from 'react';
import {ComponentType, FC, HTMLAttributes, useEffect, useState} from 'react';
import {HoverPopupPopper} from './hover-popup-popper';
import {hoverPopupStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  AnchorComponent: FC<HTMLAttributes<HTMLElement>>;
  PopupComponent: ComponentType;
};

export const HoverPopup: FC<Props> = ({AnchorComponent, PopupComponent}: Props) => {
  const classes = hoverPopupStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [tmpAnchorEl, setTmpAnchorEl] = useState<HTMLElement | null>(null);
  const [isOverBox, setIsOverBox] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);

  const onBoxOver = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setIsOverBox(true);
    setTmpAnchorEl(event.currentTarget);
    window.setTimeout(() => setAnchorEl(tmpAnchorEl), 500);
  };

  const onBoxLeave = (): void => {
    window.setTimeout(() => setIsOverBox(false), 50);
  };

  const onPopoverOver = (): void => {
    setIsOverPopover(true);
  };

  const onPopoverLeave = (): void => {
    window.setTimeout(() => setIsOverPopover(false), 50);
  };

  const clearAnchor = (): void => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!isOverBox && !isOverPopover) {
      clearAnchor();
    }
  }, [isOverBox, isOverPopover, anchorEl]);

  return (
    <>
      <AnchorComponent onMouseOver={onBoxOver} onMouseLeave={onBoxLeave} className={classes.root} />
      <HoverPopupPopper
        anchorEl={anchorEl}
        ContentComponent={PopupComponent}
        onMouseOver={onPopoverOver}
        onMouseLeave={onPopoverLeave}
      />
    </>
  );
};
