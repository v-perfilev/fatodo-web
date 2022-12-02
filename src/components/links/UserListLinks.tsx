import React, {Fragment} from 'react';
import {User} from '../../models/User';
import UserLink from './UserLink';

type UserListLinks = {
  users: User[];
};

const UserListLinks = ({users}: UserListLinks) => (
  <>
    {users.map((u, index) => (
      <Fragment key={index}>
        {index > 0 && <>, </>}
        <UserLink user={u} />
      </Fragment>
    ))}
  </>
);

export default UserListLinks;
