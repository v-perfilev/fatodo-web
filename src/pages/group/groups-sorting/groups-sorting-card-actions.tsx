import * as React from 'react';
import {FC} from 'react';
import {ArrowAllIcon} from '../../../components/icons/arrow-all-icon';
import {Box} from '@material-ui/core';
import {groupsSortingCardActionsStyles} from './_styles';

type Props = {
  bind: (...any) => void;
};

const GroupsSortingCardActions: FC<Props> = ({bind}: Props) => {
  const classes = groupsSortingCardActionsStyles();

  return (
    <Box className={classes.action}>
      <ArrowAllIcon {...bind} />
    </Box>
  );
};

export default GroupsSortingCardActions;
