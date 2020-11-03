import * as React from 'react';
import {FC} from 'react';
import {Box} from '@material-ui/core';
import GroupCardContent from './group-preview-card-content';
import {groupCardBodyStyles} from './_styles';
import GroupCardActions from './group-preview-card-notifications';

const GroupPreviewCardBody: FC = () => {
  const classes = groupCardBodyStyles();

  return (
    <Box className={classes.body}>
      <GroupCardContent />
      <GroupCardActions />
    </Box>
  );
};

export default GroupPreviewCardBody;
