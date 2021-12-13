import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactIncomingListStyles} from './_styles';
import ContactOutcomingRequest from './contact-incoming-item';

type Props = {
  requests: ContactRequestWithUser[];
};

const ContactIncomingList: FC<Props> = ({requests}: Props) => {
  const classes = contactIncomingListStyles();

  return (
    <Box className={classes.root}>
      {requests.map((request) => (
        <Box key={request.id}>
          <ContactOutcomingRequest request={request} />
        </Box>
      ))}
    </Box>
  );
};

export default ContactIncomingList;
