import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
import {Chat} from '../../../models/chat.model';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';
import {compose} from 'recompose';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const MessageMain: FC<Props> = ({authState}: Props) => {
  const classes = messageMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [chat, setChat] = useState<Chat>();

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('message:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const bigView = (): ReactNode => (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={4} className={classes.control}>
        <MessageControl chat={chat} setChat={setChat} />
      </Grid>
      <Grid item xs={8} className={classes.content}>
        <MessageContent chat={chat} account={authState.account} />
      </Grid>
    </Grid>
  );

  const smallView = (): ReactNode => (
    <Box className={classes.smallViewRoot}>
      {chat
        ? <MessageContent chat={chat} account={authState.account} />
        : <MessageControl chat={chat} setChatId={setChat} />}
    </Box>
  );

  return (
    <>
      {isBigDevice ? bigView() : smallView()}
    </>
  );
};

export default compose(connector)(MessageMain);
