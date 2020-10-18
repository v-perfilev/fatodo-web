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
  const [isOverBox, setIsOverBox] = useState(false);
  const [isOverPopover, setIsOverPopover] = useState(false);

  const onBoxOver = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    setAnchorEl(event.currentTarget);
    setIsOverBox(true);
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

  useEffect(() => {
    if (!isOverBox && !isOverPopover) {
      setAnchorEl(null);
    }
  }, [isOverBox, isOverPopover]);

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
