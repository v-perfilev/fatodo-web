import React, {Fragment} from 'react';
import {User} from '../../../../models/User';
import UserLink from '../../../../components/links/UserLink';

type EventListItemUsers = {
  users: User[];
};

const EventListItemUsers = ({users}: EventListItemUsers) => (
  <>
    {users.map((u, index) => (
      <Fragment key={index}>
        {index > 0 && <>, </>}
        <UserLink user={u} />
      </Fragment>
    ))}
  </>
);

export default EventListItemUsers;
