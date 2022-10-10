import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {contactOutcomingListStyles} from './_styles';
import ContactOutcomingRequest from './contact-outcoming-item';

type Props = {
  requests: ContactRequestWithUser[];
};

const ContactOutcomingList: FC<Props> = ({requests}: Props) => {
  const classes = contactOutcomingListStyles();

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

export default ContactOutcomingList;
