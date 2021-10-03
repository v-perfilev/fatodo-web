import React, {FC, useEffect, useState} from 'react';
import {ContactUtils} from '../../../shared/utils/contact.utils';
import {ContactRequestDTO} from '../../../models/dto/contact-request.dto';
import ContactService from '../../../services/contact.service';
import {User} from '../../../models/user.model';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {MailIcon} from '../../icons/mail-icon';
import {Button} from '@material-ui/core';
import {useChatDialogContext} from '../../../shared/contexts/dialog-contexts/chat-dialog-context';
import {LoadingButton} from '../../controls';
import {UserCancelIcon} from '../../icons/user-cancel-icon';
import {UserPlusIcon} from '../../icons/user-plus-icon';
import {UserWaitIcon} from '../../icons/user-wait-icon';
import {UserOkIcon} from '../../icons/user-ok-icon';

type Props = {
  user: User;
};

export const UserInfoViewButtons: FC<Props> = ({user}: Props) => {
  const {handleCode, handleResponse} = useSnackContext();
  const {relations, outcomingRequests, incomingRequests, update, loading: contactLoading} = useContactContext();
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
        update();
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
        handleCode('contact.requestSent', 'info');
        update();
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
        update();
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
        update();
      })
      .catch((response) => {
        handleResponse(response);
        setNotLoading();
      });
  };

  const openDirectMessageDialog = (): void => {
    showDirectMessageDialog(user);
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
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={loading}
          loading={sendLoading}
          onClick={sendRequest}
        >
          <UserPlusIcon />
        </LoadingButton>
      )}
      {isOutcomingRequest && (
        <Button variant="outlined" color="primary" disableElevation disableRipple>
          <UserWaitIcon />
        </Button>
      )}
      {isOutcomingRequest && (
        <LoadingButton
          variant="contained"
          color="secondary"
          disabled={loading}
          loading={removeLoading}
          onClick={removeRequest}
        >
          <UserCancelIcon />
        </LoadingButton>
      )}
      {isIncomingRequest && (
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={loading}
          loading={acceptLoading}
          onClick={acceptRequest}
        >
          <UserPlusIcon />
        </LoadingButton>
      )}
      {isIncomingRequest && (
        <LoadingButton
          variant="contained"
          color="secondary"
          disabled={loading}
          loading={declineLoading}
          onClick={declineRequest}
        >
          <UserCancelIcon />
        </LoadingButton>
      )}
      {isContact && (
        <Button variant="outlined" color="primary" disableElevation disableRipple>
          <UserOkIcon />
        </Button>
      )}
      <Button variant="contained" color="secondary" onClick={openDirectMessageDialog}>
        <MailIcon />
      </Button>
    </>
  );
};
