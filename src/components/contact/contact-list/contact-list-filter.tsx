import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';

type Props = {
  users: User[];
  setUsersToShow: (users: User[]) => void;
}

const ContactListFilter: FC<Props> = ({users, setUsersToShow}: Props) => {

  return (
    <Box>
      Filter
    </Box>
  );
};

export default ContactListFilter;
