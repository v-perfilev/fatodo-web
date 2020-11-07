import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';

type Props = {
  user: User;
};

const ContactListUser: FC<Props> = ({user}: Props) => {
  return <Box>{user}</Box>;
};

export default ContactListUser;
