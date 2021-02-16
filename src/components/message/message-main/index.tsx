import React, {FC, ReactNode, useEffect} from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useAdditionalMenuContext} from '../../../shared/contexts/additional-menu-context';
import AdditionalMenuSpacer from '../../common/layouts/additional-menu/additional-menu-spacer';
import AdditionalMenuButton from '../../common/layouts/additional-menu/additional-menu-button';
import {ArrowBackIcon} from '../../common/icons/arrow-back-icon';
import {useLastLocation} from 'react-router-last-location';
import {Routes} from '../../router';
import {messageMainStyles} from './_styles';
import {Box, Grid, Theme, useMediaQuery} from '@material-ui/core';
import MessageChatList from '../message-chat-list';
import MessageChatView from '../message-chat-view';


const MessageMain: FC = () => {
  const classes = messageMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const chatId = match.params['chatId'];

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuSpacer />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const bigView = (): ReactNode => (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={3} className={classes.sidebar}>
        <MessageChatList />
      </Grid>
      <Grid item xs={9} className={classes.content}>
        <MessageChatView />
      </Grid>
    </Grid>
  );

  const smallView = (): ReactNode => (
    <Box className={classes.smallViewRoot}>
      {chatId ? <MessageChatView /> : <MessageChatList />}
    </Box>
  );

  return (
    <>
      {isBigDevice ? bigView() : smallView()}
    </>
  );
};

export default MessageMain;
