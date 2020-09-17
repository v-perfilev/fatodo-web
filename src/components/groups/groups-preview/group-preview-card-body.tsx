import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import GroupCardContent from './group-preview-card-content';
import {groupCardBodyStyles} from './_styles';
import {GroupProps} from '../_types';
import GroupCardActions from './group-preview-card-actions';

type Props = GroupProps;

const GroupPreviewCardBody: FC<Props> = ({group}: Props) => {
  const classes = groupCardBodyStyles();

  return (
    <Box className={classes.body}>
      <GroupCardContent items={group.items ?? []} />
      <GroupCardActions
        users={group.users}
        messageCount={group.messageCount}
        notificationCount={group.notificationCount}
      />
    </Box>
  );
};

export default GroupPreviewCardBody;
