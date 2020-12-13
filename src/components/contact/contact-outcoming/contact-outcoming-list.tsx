import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {PageDivider} from '../../common/surfaces';
import {contactOutcomingListStyles} from './_styles';
import ContactOutcomingRequest from './contact-outcoming-request';

type Props = {
  requests: ContactRequestWithUser[];
  loadRequests: () => void;
};

const ContactOutcomingList: FC<Props> = ({requests, loadRequests}: Props) => {
  const classes = contactOutcomingListStyles();

  return (
    <Box className={classes.root}>
      {requests.map((request, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <ContactOutcomingRequest request={request} loadRequests={loadRequests} />
        </Box>
      ))}
    </Box>
  );
};

export default ContactOutcomingList;
