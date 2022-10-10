import * as React from 'react';
import {useState} from 'react';
import {AppBar, Hidden, IconButton, Slide, Theme, Toolbar, useScrollTrigger} from '@material-ui/core';
import HorizontalMenu from './HorizontalMenu';
import {logout} from '../../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../../pages/router';
import {RedirectMap} from './type';
import {Grower} from '../../surfaces';
import LogoWithText from '../LogoWithText';
import MenuIcon from '../../icons/MenuIcon';
import {makeStyles} from '@material-ui/core/styles';
import {HEADER_HEIGHT} from '../../../constants';
import SidebarMenu from './SidebarMenu';

const mapDispatchToProps = {logout};
const connector = connect(null, mapDispatchToProps);

type BaseProps = {
  flexible?: boolean;
};

type HeaderProps = ConnectedProps<typeof connector> & BaseProps;

const Header = ({flexible, logout}: HeaderProps) => {
  const classes = headerStyles();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const trigger = useScrollTrigger({disableHysteresis: true});

  const redirectMap = {
    toLogin: (): void => history.push(Routes.LOGIN),
    toRegistration: (): void => history.push(Routes.REGISTRATION),
    toAccount: (): void => history.push(Routes.ACCOUNT),
    toGroups: (): void => history.push(Routes.GROUPS),
    toChats: (): void => history.push(Routes.CHATS),
    toContacts: (): void => history.push(Routes.CONTACTS),
    toRootAndLogout: (): void => {
      history.push(Routes.ROOT);
      logout();
    },
  } as RedirectMap;

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <Slide appear={false} in={!flexible || !trigger}>
      <AppBar elevation={3} className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <LogoWithText href={Routes.ROOT} />
          <Grower />
          <Hidden smDown>
            <HorizontalMenu redirectMap={redirectMap} />
          </Hidden>
          <Hidden mdUp>
            <IconButton color="primary" onClick={toggleMenu} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <SidebarMenu show={showMenu} onToggle={toggleMenu} redirectMap={redirectMap} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

const headerStyles = makeStyles((theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: {
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(-1) + 'px !important',
  },
}));

export default connector(Header);
