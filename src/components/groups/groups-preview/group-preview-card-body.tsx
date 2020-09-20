import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import GroupCardContent from './group-preview-card-content';
import {groupCardBodyStyles} from './_styles';
import GroupCardActions from './group-preview-card-notifications';
import {Group} from '../../../models/group.model';

type Props = {
  group: Group;
};

const GroupPreviewCardBody: FC<Props> = ({group}: Props) => {
  const classes = groupCardBodyStyles();

  return (
    <Box className={classes.body}>
      <GroupCardContent items={group.items ?? []} />
      <GroupCardActions group={group} />
    </Box>
  );
};

export default GroupPreviewCardBody;
