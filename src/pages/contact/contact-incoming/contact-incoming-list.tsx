import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {PageDivider} from '../../../components/surfaces';
import {contactIncomingListStyles} from './_styles';
import ContactOutcomingRequest from './contact-incoming-item';
import ContactIncomingStub from './contact-incoming-stub';

type Props = {
  requests: ContactRequestWithUser[];
  loadRequests: () => void;
};

const ContactIncomingList: FC<Props> = ({requests, loadRequests}: Props) => {
  const classes = contactIncomingListStyles();

  return (
    <Box className={classes.root}>
      {requests.length === 0 && <ContactIncomingStub />}
      {requests.length > 0 &&
        requests.map((request, index) => (
          <Box key={index}>
            {index !== 0 && <PageDivider />}
            <ContactOutcomingRequest request={request} loadRequests={loadRequests} />
          </Box>
        ))}
    </Box>
  );
};

export default ContactIncomingList;
