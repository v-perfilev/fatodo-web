import React, {PropsWithChildren, ReactElement, useCallback, useMemo, useRef, useState} from 'react';
import {Fade, Menu, MenuItem, Typography} from '@mui/material';
import FHStack from '../boxes/FHStack';
import CircularSpinner from '../loaders/CircularSpinner';

export type PopupMenuItemProps = {
  action: (e?: React.MouseEvent) => void;
  text: string;
  icon?: ReactElement;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  loading?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

type PopupMenuProps = PropsWithChildren<{
  trigger: ReactElement;
}>;

export const PopupMenuItem = ({action, text, icon, color, loading, disabled, hidden}: PopupMenuItemProps) => {
  const iconElement = icon ? React.cloneElement(icon, {color, fontSize: 'small'}) : undefined;

  return (
    !hidden && (
      <MenuItem disabled={disabled} onClick={action}>
        <FHStack spacing={1}>
          {loading ? <CircularSpinner size="xs" /> : iconElement}
          <Typography fontSize={14}>{text}</Typography>
        </FHStack>
      </MenuItem>
    )
  );
};

const PopupMenu = ({trigger, children}: PopupMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef();

  const handleClick = useCallback((e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  const triggerWithRef = useMemo<ReactElement>(() => {
    return React.cloneElement(trigger, {ref, onClick: handleClick});
  }, [trigger]);

  const childrenWithCloseHandler = useMemo<ReactElement[]>(() => {
    const buildOnClick = (childOnClick: (e?: React.MouseEvent) => void) => (e: React.MouseEvent) => {
      childOnClick(e);
      handleClose(e);
    };
    return (children as ReactElement[]).map((child, key) =>
      React.cloneElement(child, {action: buildOnClick(child.props.action), key}),
    );
  }, [children]);

  return (
    <>
      {triggerWithRef}
      <Menu
        TransitionComponent={Fade}
        anchorEl={ref.current}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        transformOrigin={{vertical: 'top', horizontal: 'center'}}
        MenuListProps={{disablePadding: true}}
        PaperProps={{sx: {borderRadius: 3}}}
        open={isOpen}
        onClose={handleClose}
      >
        {childrenWithCloseHandler}
      </Menu>
    </>
  );
};

export default PopupMenu;
