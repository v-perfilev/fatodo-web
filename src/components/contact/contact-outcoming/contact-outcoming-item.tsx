import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC, memo, useState} from 'react';
import {Box} from '@material-ui/core';
import {contactOutcomingRequestStyles} from './_styles';
import {LoadingButton} from '../../common/controls';
import {UserWithPopupView} from '../../common/views';
import {useTranslation} from 'react-i18next';
import ContactService from '../../../services/contact.service';
import {useSnackContext} from '../../../shared/contexts/snack-context';

type Props = {
  request: ContactRequestWithUser;
  loadRequests: () => void;
};

const ContactOutcomingItem: FC<Props> = ({request, loadRequests}: Props) => {
  const classes = contactOutcomingRequestStyles();
  const {handleCode, handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    ContactService.removeRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestRemoved', 'info');
        loadRequests();
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
        <LoadingButton color="secondary" size="medium" disabled={disabled} onClick={removeRequest}>
          {t('contact:outcoming.remove')}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default memo(ContactOutcomingItem);