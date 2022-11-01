import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {User} from '../../../models/User';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ContactRequestDTO} from '../../../models/dto/ContactRequestDTO';
import FVStack from '../../../components/boxes/FVStack';
import {ContactUtils} from '../../../shared/utils/ContactUtils';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useTranslation} from 'react-i18next';
import MailIcon from '../../../components/icons/MailIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import UserCancelIcon from '../../../components/icons/UserCancelIcon';
import UserWaitIcon from '../../../components/icons/UserWaitIcon';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import {Button} from '@mui/material';
import FHStack from '../../../components/boxes/FHStack';

type UserViewControlProps = {
  user: User;
};

const UserViewControl = ({user}: UserViewControlProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {showDirectMessageDialog} = useChatDialogContext();
  const [loading, setLoading] = useDelayedState(false);
  const relations = useAppSelector(ContactsSelectors.relations);
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);

  const isContact = ContactUtils.isContact(user, relations);
  const isOutcomingRequest = ContactUtils.isOutcomingRequest(user, outcomingRequests);
  const isIncomingRequest = ContactUtils.isIncomingRequest(user, incomingRequests);

  const sendContactRequest = (): void => {
    const dto: ContactRequestDTO = {recipientId: user.id};
    setLoading(true);
    dispatch(ContactsActions.sendRequestThunk(dto)).then(() => setLoading(false));
  };

  const removeContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsActions.removeOutcomingRequestThunk(user.id)).then(() => setLoading(false));
  };

  const acceptContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsActions.acceptIncomingRequestThunk(user.id)).then(() => setLoading(false));
  };

  const declineContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsActions.declineIncomingRequestThunk(user.id)).then(() => setLoading(false));
  };

  const removeContact = (): void => {
    setLoading(true);
    dispatch(ContactsActions.removeRelationThunk(user.id)).then(() => setLoading(false));
  };

  const openDirectMessageDialog = (): void => {
    showDirectMessageDialog(user);
  };

  return (
    <FHStack>
      {!isContact && !isOutcomingRequest && !isIncomingRequest && (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<UserPlusIcon />}
          disabled={loading}
          onClick={sendContactRequest}
        >
          {t('user:actions.sendContactRequest')}
        </Button>
      )}
      {isOutcomingRequest && (
        <>
          <Button variant="outlined" color="primary" startIcon={<UserWaitIcon />} disabled>
            {t('user:actions.waitContactAccepting')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<UserCancelIcon />}
            disabled={loading}
            onClick={removeContactRequest}
          >
            {t('user:actions.cancelContactRequest')}
          </Button>
        </>
      )}
      {isIncomingRequest && (
        <>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<UserPlusIcon />}
            disabled={loading}
            onClick={acceptContactRequest}
          >
            {t('user:actions.acceptContactRequest')}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<UserCancelIcon />}
            disabled={loading}
            onClick={declineContactRequest}
          >
            {t('user:actions.declineContactRequest')}
          </Button>
        </>
      )}
      {isContact && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<UserMinusIcon />}
          disabled={loading}
          onClick={removeContact}
        >
          {t('user:actions.removeContact')}
        </Button>
      )}
      <Button variant="outlined" color="primary" startIcon={<MailIcon />} onClick={openDirectMessageDialog}>
        {t('user:actions.sendMessage')}
      </Button>
    </FHStack>
  );
};

export default UserViewControl;
