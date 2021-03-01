import React, {FC, ReactNode, useEffect, useState} from 'react';
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
import MessageControl from '../message-control';
import MessageContent from '../message-content';


const MessageMain: FC = () => {
  const classes = messageMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const match = useRouteMatch();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [chatId, setChatId] = useState<string>();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('contact:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    setChatId(match.params['chatId']);
  }, []);

  useEffect(() => {
    console.log(chatId);
  }, [chatId]);

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const bigView = (): ReactNode => (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={4} className={classes.control}>
        <MessageControl setChatId={setChatId} />
      </Grid>
      <Grid item xs={8} className={classes.content}>
        <MessageContent chatId={chatId} />
      </Grid>
    </Grid>
  );

  const smallView = (): ReactNode => (
    <Box className={classes.smallViewRoot}>
      {chatId
        ? <MessageContent chatId={chatId} />
        : <MessageControl setChatId={setChatId} />}
    </Box>
  );

  return (
    <>
      {isBigDevice ? bigView() : smallView()}
    </>
  );
};

export default MessageMain;
