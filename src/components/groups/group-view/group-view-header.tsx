import React, {FC} from 'react';
import {Box, Typography} from '@material-ui/core';
import {groupHeaderStyles} from './_styles';
import Divider from '../../common/divider';
import {Group} from '../../../models/group';

type Props = {
  group: Group;
}

const GroupViewHeader: FC<Props> = ({group}: Props) => {
  const classes = groupHeaderStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h6" color="primary">
        <Box fontWeight="fontWeightMedium">
          {group.title}
        </Box>
      </Typography>
      <Divider color={'yellow'} height={5} />
    </Box>
  );
};

export default GroupViewHeader;
