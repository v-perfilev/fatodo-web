import React, {FC} from 'react';
import {Box, Divider, Fab, SwipeableDrawer, Theme, Toolbar} from '@material-ui/core';
import VerticalMenu from './VerticalMenu';
import {RedirectMap} from './type';
import {makeStyles} from '@material-ui/core/styles';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import LanguageSelect from '../../controls/LanguageSelect';
import Grower from '../../surfaces/Grower';

type Props = {
  show: boolean;
  onToggle: () => void;
  redirectMap: RedirectMap;
};

const SidebarMenu: FC<Props> = ({show, onToggle, redirectMap}: Props) => {
  const classes = sidebarMenuStyles();

  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <Box className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Fab size="small" color="primary" onClick={onToggle}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu redirectMap={redirectMap} />
        <Grower />
        <LanguageSelect list />
      </Box>
    </SwipeableDrawer>
  );
};

const sidebarMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 200,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default SidebarMenu;
