import * as React from 'react';
import {FC, memo} from 'react';
import {Badge, Box, CardActions} from '@material-ui/core';
import {BellIcon} from '../../common/icons/bell-icon';
import {MessageIcon} from '../../common/icons/message-icon';
import GroupPreviewCardAvatars from './group-preview-card-avatars';
import {groupCardActionsStyles} from './_styles';
import {compose} from 'recompose';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardActions: FC<Props> = ({group}: Props) => {
  const classes = groupCardActionsStyles();

  return (
    <CardActions className={classes.actions}>
      <GroupPreviewCardAvatars group={group} />
      <Box className={classes.badges}>
        <Badge color="primary" max={5} badgeContent={group.notificationCount}>
          <BellIcon className={classes.icon} />
        </Badge>
        <Badge color="primary" max={5} badgeContent={group.messageCount}>
          <MessageIcon className={classes.icon} />
        </Badge>
      </Box>
    </CardActions>
  );
};

export default compose(memo)(GroupPreviewCardActions);
