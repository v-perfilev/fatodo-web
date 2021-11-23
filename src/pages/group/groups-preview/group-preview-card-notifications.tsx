import * as React from 'react';
import {FC} from 'react';
import {Box, CardActions} from '@material-ui/core';
import {groupCardNotificationsStyles} from './_styles';
import {AvatarGroup, BoxWithIcon} from '../../../components/surfaces';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {ItemsIcon} from '../../../components/icons/items-icon';

const GroupPreviewCardNotifications: FC = () => {
  const classes = groupCardNotificationsStyles();
  const {users} = useUserListContext();
  const {objs: items} = useItemListContext();

  return (
    <CardActions className={classes.users}>
      <AvatarGroup users={users} />
      <Box className={classes.badges}>
        <BoxWithIcon icon={<ItemsIcon color="primary" />}>{items?.length || 0}</BoxWithIcon>
      </Box>
    </CardActions>
  );
};

export default GroupPreviewCardNotifications;
