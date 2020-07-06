import * as React from 'react';
import {CSSProperties, FC} from 'react';
import {Box} from '@material-ui/core';
import GroupCardContent from './group-card-content';
import {groupCardBodyStyles} from './_styles';
import {Group} from '../_types';
import GroupCardActions from './group-card-actions';
import {compose} from 'recompose';
import {animated} from 'react-spring';

interface Props {
  group: Group;
  style: CSSProperties;
}

const GroupCardBody: FC<Props> = ({group, style}: Props) => {
  const classes = groupCardBodyStyles();

  return (
    <Box className={classes.body} style={style}>
      <GroupCardContent items={group.items} />
      <GroupCardActions users={group.users} messageCount={group.messageCount}
                        notificationCount={group.notificationCount} />
    </Box>
  );
};

export default compose(animated)(GroupCardBody);
