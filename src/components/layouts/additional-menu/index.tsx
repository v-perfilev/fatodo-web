import * as React from 'react';
import {FC, ReactNode, useEffect, useMemo} from 'react';
import {additionalMenuStyles} from './_styles';
import {useAdditionalMenuContext} from '../../../shared/contexts/menu-contexts/additional-menu-context';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';
import {CircularProgress} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
import {MenuIcon} from '../../icons/menu-icon';
import {CloseIcon} from '../../icons/close-icon';

const AdditionalMenu: FC = () => {
  const classes = additionalMenuStyles();
  const {pathname} = useLocation();
  const {menu, setMenu, loading, setLoading} = useAdditionalMenuContext();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const icon = useMemo<ReactNode>(() => {
    return loading ? (
      <CircularProgress color="inherit" />
    ) : (
      <SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />
    );
  }, [loading]);

  useEffect(() => {
    setMenu(null);
    setLoading(false);
  }, [pathname]);

  return menu ? (
    <SpeedDial
      ariaLabel="Menu"
      className={classes.root}
      icon={icon}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      {menu
        .filter((action) => !action.hidden && !action.disabled)
        .map((action, index) => (
          <SpeedDialAction key={index} icon={action.icon} tooltipTitle={action.text} onClick={action.action} />
        ))}
    </SpeedDial>
  ) : null;
};

export default AdditionalMenu;
