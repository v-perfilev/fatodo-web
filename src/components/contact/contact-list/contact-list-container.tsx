import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {User} from '../../../models/user.model';
import {contactListContainerStyles} from './_styles';
import ContactListFilter from './contact-list-filter';
import ContactListUser from './contact-list-user';

type Props = {
  users: User[];
}

const ContactListContainer: FC<Props> = ({users}: Props) => {
  const classes = contactListContainerStyles();
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  useEffect(() => {
    setUsersToShow(users);
  }, [users]);

  return (
    <Box className={classes.root}>
      <ContactListFilter users={users} setUsersToShow={setUsersToShow} />
      {usersToShow.map((user, index) => (
        <ContactListUser user={user} key={index} />
      ))}
    </Box>
  );
};

export default ContactListContainer;
