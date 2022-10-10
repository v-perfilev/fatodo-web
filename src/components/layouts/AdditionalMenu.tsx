import React, {ReactNode, useEffect, useMemo, useState} from 'react';
import {useAdditionalMenuContext} from '../../shared/contexts/menu-contexts/additional-menu-context';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from '@material-ui/lab';
import {CircularProgress, Hidden} from '@material-ui/core';
import {useLocation} from 'react-router-dom';
import MenuIcon from '../icons/MenuIcon';
import CloseIcon from '../icons/CloseIcon';
import {MenuElement} from '../../shared/contexts/menu-contexts/types';
import {makeStyles, Theme} from '@material-ui/core/styles';

const AdditionalMenu = () => {
  const classes = additionalMenuStyles();
  const {pathname} = useLocation();
  const {menu, setMenu, loading, setLoading} = useAdditionalMenuContext();
  const [open, setOpen] = useState<boolean>(false);

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

  const filteredMenu = useMemo<MenuElement[]>(() => {
    return menu?.filter((action) => !action.hidden && !action.disabled);
  }, [menu]);

  useEffect(() => {
    setMenu(null);
    setLoading(false);
  }, [pathname]);

  return filteredMenu ? (
    <Hidden smDown>
      <SpeedDial
        ariaLabel="Menu"
        className={classes.root}
        icon={icon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {filteredMenu.map((action, index) => (
          <SpeedDialAction icon={action.icon} tooltipTitle={action.text} onClick={action.action} key={index} />
        ))}
      </SpeedDial>
    </Hidden>
  ) : null;
};

const additionalMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export default AdditionalMenu;
