import React, {FC} from 'react';
import {Group} from '../_types';
import {Box, Typography} from '@material-ui/core';
import {groupHeaderStyles} from './_styles';
import csx from 'classnames';

type Props = {
  group: Group;
}

const GroupViewHeader: FC<Props> = ({group}: Props) => {
  const classes = groupHeaderStyles();

  const dividerClassNames = csx(classes.divider, classes.dividerYellow);

  return (
    <Box className={classes.root}>
      <Typography variant="h6" color="primary">
        <Box fontWeight="fontWeightMedium">
          {group.title}
        </Box>
      </Typography>
      <Box className={dividerClassNames} />
    </Box>
  );
};

export default GroupViewHeader;
