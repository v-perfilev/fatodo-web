import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC, memo, useState} from 'react';
import {Box} from '@material-ui/core';
import {contactIncomingRequestStyles} from './_styles';
import {LoadingButton} from '../../../components/controls';
import {UserWithPopupView} from '../../../components/views';
import {useTranslation} from 'react-i18next';
import ContactService from '../../../services/contact.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useContactContext} from '../../../shared/contexts/contact-contexts/contact-context';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';

type Props = {
  request: ContactRequestWithUser;
};

const ContactIncomingItem: FC<Props> = ({request}: Props) => {
  const classes = contactIncomingRequestStyles();
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    ContactService.acceptRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestAccepted', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setDisabled(false);
      });
  };

  const declineRequest = (): void => {
    setDisabled(true);
    ContactService.declineRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestDeclined', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setDisabled(false);
      });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.body}>
        <UserWithPopupView user={request.user} withUsername picSize="sm" />
      </Box>
      <Box className={classes.managementBox}>
        <LoadingButton size="medium" disabled={disabled} onClick={acceptRequest}>
          {t('contact:incoming.accept')}
        </LoadingButton>
        <LoadingButton color="secondary" size="medium" disabled={disabled} onClick={declineRequest}>
          {t('contact:incoming.decline')}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default memo(ContactIncomingItem);
