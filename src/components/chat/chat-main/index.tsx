import React, {FC, useEffect, useState} from 'react';
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
import ChatControl from '../chat-control';
import ChatContent from '../chat-content';
import {Chat} from '../../../models/chat.model';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {compose} from 'recompose';
import {PlusIcon} from '../../common/icons/plus-icon';
import CreateChatDialog from '../create-chat-dialog';
import withUserList from '../../../shared/hocs/with-list/with-user-list';
import withAuthState from '../../../shared/hocs/with-auth-state';

type Props = AuthState;

const ChatMain: FC<Props> = ({account}: Props) => {
  const classes = messageMainStyles();
  const history = useHistory();
  const lastLocation = useLastLocation();
  const {i18n, t} = useTranslation();
  const {updateMenu} = useAdditionalMenuContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});
  const [showCreateChatDialog, setShowCreateChatDialog] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat>();

  const openRequestDialog = (): void => setShowCreateChatDialog(true);

  const redirectToPreviousLocation = (): void => history.push(lastLocation?.pathname ?? Routes.ROOT);

  const menu = (
    <>
      <AdditionalMenuButton
        icon={<PlusIcon />}
        action={openRequestDialog}
        color="primary"
        tooltip={t('contact:tooltips.addContact')}
      />
      <AdditionalMenuSpacer showOnSmallDevices />
      <AdditionalMenuButton
        icon={<ArrowBackIcon />}
        action={redirectToPreviousLocation}
        color="secondary"
        tooltip={t('chat:tooltips.back')}
      />
    </>
  );

  useEffect(() => {
    updateMenu(menu);
  }, [i18n.language]);

  const bigView = (
    <Grid container className={classes.bigViewRoot}>
      <Grid item xs={4} className={classes.control}>
        <ChatControl chat={chat} setChat={setChat} account={account} />
      </Grid>
      <Grid item xs={8} className={classes.content}>
        <ChatContent chat={chat} account={account} />
      </Grid>
    </Grid>
  );

  const smallView = (
    <Box className={classes.smallViewRoot}>
      {chat ? (
        <ChatContent chat={chat} account={account} />
      ) : (
        <ChatControl chat={chat} setChat={setChat} account={account} />
      )}
    </Box>
  );

  return (
    <>
      {isBigDevice ? bigView : smallView}
      <CreateChatDialog show={showCreateChatDialog} setShow={setShowCreateChatDialog} />
    </>
  );
};

export default compose(withUserList, withAuthState)(ChatMain);
