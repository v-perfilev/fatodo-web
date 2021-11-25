import {ContactRequestWithUser} from '../../../models/contact-request.model';
import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {PageDivider} from '../../../components/surfaces';
import {contactOutcomingListStyles} from './_styles';
import ContactOutcomingRequest from './contact-outcoming-item';

type Props = {
  requests: ContactRequestWithUser[];
};

const ContactOutcomingList: FC<Props> = ({requests}: Props) => {
  const classes = contactOutcomingListStyles();

  return (
    <Box className={classes.root}>
      {requests.map((request, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider />}
          <ContactOutcomingRequest request={request} />
        </Box>
      ))}
    </Box>
  );
};

export default ContactOutcomingList;
