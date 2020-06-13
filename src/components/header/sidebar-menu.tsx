import * as React from 'react';
import {FC} from 'react';
import {Box, Divider, Fab, SwipeableDrawer, Toolbar} from '@material-ui/core';
import {withTranslation} from 'react-i18next';
import {compose} from 'recompose';
import {ArrowRightIcon} from '../common/icons/arrow-right-icon';
import LanguageSelect from '../common/language-select';
import VerticalMenu from './vertical-menu';
import {sidebarMenuStyles} from './_styles';

interface ComponentProps {
  show: boolean;
  onToggle: () => void;
}

type Props = ComponentProps;

const SidebarMenu: FC<Props> = ({show, onToggle}: Props) => {
  const classes = sidebarMenuStyles();

  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <Box className={classes.root}>
        <Toolbar>
          <Fab size="small" color="primary" onClick={onToggle} className={classes.menuButton}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu />
        <Box className={classes.grow} />
        <LanguageSelect list />
      </Box>
    </SwipeableDrawer>
  );
};

export default compose<ComponentProps>(withTranslation())(SidebarMenu);
