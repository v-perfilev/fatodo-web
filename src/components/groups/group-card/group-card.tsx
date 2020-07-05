import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Card} from '@material-ui/core';
import GroupCardHeader from './group-card-header';
import GroupCardContent from './group-card-content';
import {groupCardStyles} from './_styles';
import {Group} from '../_types';
import GroupCardActions from './group-card-actions';

interface ComponentProps {
  group: Group;
  mode: string;
}

type Props = ComponentProps & HTMLAttributes<any>;

const GroupCard: FC<Props> = ({group, mode}: Props) => {
  const classes = groupCardStyles();

  const isNormalMode = mode === 'normal';

  return (
    <Card square elevation={3} className={classes.card}>
      <GroupCardHeader title={group.title} />
      <GroupCardContent items={group.items} />
      <GroupCardActions users={group.users} messageCount={group.messageCount}
                        notificationCount={group.notificationCount} />
      {/*{isNormalMode && (*/}
      {/*  <>*/}
      {/*    */}
      {/*  </>*/}
      {/*)}*/}
    </Card>
  );
};

export default GroupCard;
