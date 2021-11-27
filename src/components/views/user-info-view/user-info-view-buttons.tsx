import React, {FC, useEffect, useState} from 'react';
import {ContactUtils} from '../../../shared/utils/contact.utils';
import {ContactRequestDTO} from '../../../models/dto/contact-request.dto';
import ContactService from '../../../services/contact.service';
import {User} from '../../../models/user.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {MailIcon} from '../../icons/mail-icon';
import {Box, Button, Tooltip} from '@material-ui/core';
import {useChatDialogContext} from '../../../shared/contexts/dialog-contexts/chat-dialog-context';
import {LoadingButton} from '../../controls';
import {UserCancelIcon} from '../../icons/user-cancel-icon';
import {UserPlusIcon} from '../../icons/user-plus-icon';
import {UserWaitIcon} from '../../icons/user-wait-icon';
import {UserOkIcon} from '../../icons/user-ok-icon';
import {useTranslation} from 'react-i18next';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';
import {PopupContentComponentProps} from '../../surfaces/hover-popup/hover-popup-popper';

type Props = PopupContentComponentProps & {
  user: User;
};

export const UserInfoViewButtons: FC<Props> = ({user, closePopup}: Props) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateInfo} = useContactInfoContext();
  const {
    relations,
    outcomingRequests,
    incomingRequests,
    update: updateContacts,
    loading: contactLoading,
  } = useContactContext();
  const {showDirectMessageDialog} = useChatDialogContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false);
  const [declineLoading, setDeclineLoading] = useState<boolean>(false);

  const isContact = ContactUtils.isContact(user, relations);
  const isOutcomingRequest = ContactUtils.isOutcomingRequest(user, outcomingRequests);
  const isIncomingRequest = ContactUtils.isIncomingRequest(user, incomingRequests);

  const setNotLoading = (): void => {
    setLoading(false);
    setSendLoading(false);
    setRemoveLoading(false);
    setAcceptLoading(false);
    setDeclineLoading(false);
  };

  const sendRequest = (): void => {
    setSendLoading(true);
    const dto = {recipientId: user.id, message: ''} as ContactRequestDTO;
    ContactService.sendRequest(dto)
      .then(() => {
        handleCode('contact.requestSent', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setNotLoading();
      });
  };

  const removeRequest = (): void => {
    setRemoveLoading(true);
    ContactService.removeRequest(user.id)
      .then(() => {
        handleCode('contact.requestRemoved', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setNotLoading();
      });
  };

  const acceptRequest = (): void => {
    setAcceptLoading(true);
    ContactService.acceptRequest(user.id)
      .then(() => {
        handleCode('contact.requestAccepted', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setNotLoading();
      });
  };

  const declineRequest = (): void => {
    setDeclineLoading(true);
    ContactService.declineRequest(user.id)
      .then(() => {
        handleCode('contact.requestDeclined', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setNotLoading();
      });
  };

  const openDirectMessageDialog = (): void => {
    showDirectMessageDialog(user);
    closePopup();
  };

  useEffect(() => {
    if (sendLoading || removeLoading || acceptLoading || declineLoading) {
      setLoading(true);
    }
  }, [sendLoading, removeLoading, acceptLoading, declineLoading]);

  useEffect(() => {
    if (!contactLoading) {
      setNotLoading();
    }
  }, [contactLoading]);

  return (
    <>
      {!isContact && !isOutcomingRequest && !isIncomingRequest && (
        <Tooltip title={t('account:info.sendContactRequest')}>
          <Box>
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={loading}
              loading={sendLoading}
              onClick={sendRequest}
            >
              <UserPlusIcon />
            </LoadingButton>
          </Box>
        </Tooltip>
      )}
      {isOutcomingRequest && (
        <Tooltip title={t('account:info.waitContactAccepting')}>
          <Box>
            <Button variant="outlined" color="primary" disableElevation disableRipple>
              <UserWaitIcon />
            </Button>
          </Box>
        </Tooltip>
      )}
      {isOutcomingRequest && (
        <Tooltip title={t('account:info.cancelContactRequest')}>
          <Box>
            <LoadingButton
              variant="contained"
              color="secondary"
              disabled={loading}
              loading={removeLoading}
              onClick={removeRequest}
            >
              <UserCancelIcon />
            </LoadingButton>
          </Box>
        </Tooltip>
      )}
      {isIncomingRequest && (
        <Tooltip title={t('account:info.acceptContactRequest')}>
          <Box>
            <LoadingButton
              variant="contained"
              color="primary"
              disabled={loading}
              loading={acceptLoading}
              onClick={acceptRequest}
            >
              <UserPlusIcon />
            </LoadingButton>
          </Box>
        </Tooltip>
      )}
      {isIncomingRequest && (
        <Tooltip title={t('account:info.declineContactRequest')}>
          <Box>
            <LoadingButton
              variant="contained"
              color="secondary"
              disabled={loading}
              loading={declineLoading}
              onClick={declineRequest}
            >
              <UserCancelIcon />
            </LoadingButton>
          </Box>
        </Tooltip>
      )}
      {isContact && (
        <Tooltip title={t('account:info.userInContactList')}>
          <Box>
            <Button variant="outlined" color="primary" disableElevation disableRipple>
              <UserOkIcon />
            </Button>
          </Box>
        </Tooltip>
      )}
      <Tooltip title={t('account:info.sendMessage')}>
        <Box>
          <Button variant="contained" color="secondary" disabled={!isContact} onClick={openDirectMessageDialog}>
            <MailIcon />
          </Button>
        </Box>
      </Tooltip>
    </>
  );
};
